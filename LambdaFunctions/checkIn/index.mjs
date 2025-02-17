import pkg from "pg";
const { Client } = pkg;
import jwt from "jsonwebtoken";

export const handler = async (event) => {
    const dbConfig = {
        user: process.env.USER,
        host: process.env.DB_CONN,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    };

    // Extract JWT from cookies
    const cookies = event.cookies || [];
    const tokenCookie = cookies.find(cookie => cookie.startsWith('goaltoken='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: "Unauthorized: Missing JWT token" }),
        };
    }

    try {
        // Decode the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userid = decoded.userId;

        // Parse request body
        const data = JSON.parse(event.body);
        const goalId = data.goalId;

        if (!goalId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields, expecting goalId." }),
            };
        }

        const client = new Client(dbConfig);
        await client.connect();

        // Ensure goal exists and belongs to the user
        const checkGoalQuery = `
            SELECT id, lastcheckin FROM goals WHERE id = $1 AND userid = $2;
        `;
        const goalResult = await client.query(checkGoalQuery, [goalId, userid]);

        if (goalResult.rows.length === 0) {
            await client.end();
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Goal not found or does not belong to user." }),
            };
        }

        const lastCheckin = goalResult.rows[0].lastcheckin ? new Date(goalResult.rows[0].lastcheckin) : null;
        const currentDate = new Date();
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 2); // Effectively "yesterday"

        let newStatus = "Active";
        if (lastCheckin && lastCheckin < oneDayAgo) {
            newStatus = "Failed";
        }

        // Update last check-in and possibly status
        const updateQuery = `
            UPDATE goals
            SET lastcheckin = $1, status = $2
            WHERE id = $3;
        `;
        await client.query(updateQuery, [currentDate.toISOString(), newStatus, goalId]);

        await client.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Check-in successful", newStatus }),
        };

    } catch (error) {
        console.error("Error processing check-in:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", issue: String(error) }),
        };
    }
};
