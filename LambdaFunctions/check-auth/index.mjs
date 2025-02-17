import pkg from "pg";
const { Client } = pkg;
import jwt from "jsonwebtoken";

export const handler = async (event) => {
    

    // Extract JWT from cookies
    const cookies = event.cookies || [];
    const tokenCookie = cookies.find(cookie => cookie.startsWith('goaltoken='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;

    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: "Unauthorized: Missing JWT token" }),
            isAuthenticated: false,
        };
    }

    try {
        // Decode and verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userid = decoded.userId;

        // Parse request body
        const data = JSON.parse(event.body);

        if (!userid) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Issue with UserId" }),
                isAuthenticated: false,
            };
        }


        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Auth successful" }),
            isAuthenticated: true,
        };

    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Unauthorized: Token has expired" }),
                isAuthenticated: false,
            };
        }
        
        // Handle other errors
        console.error("Error processing check-in:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", issue: String(error) }),
        };
    }
};
