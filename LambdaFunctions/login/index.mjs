import pkg from "pg";
const { Client } = pkg;
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const handler = async (event) => {
    // Database connection details (Use Secrets Manager in production)


    const dbConfig = {
        user: process.env.USER,
        host: process.env.DB_CONN,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: 5432,
        ssl: {
            rejectUnauthorized: false // This can be set to false for a basic connection. Set to true for stricter SSL verification.
        }
    };

    // Extract user details from event body
    const data = JSON.parse(event.body);
    const username = data.username;
    const password = data.password;

    if (!username || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing required fields, expecting username, password" }),
        };
    }

    const client = new Client(dbConfig);

    try {
        await client.connect();

        const query = `
          SELECT id,passwordhash FROM users WHERE username = $1;
        `;

        const result = await client.query(query, [username]);

        if (result.rows.length === 0) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid username or password" }),
            };
        }

        const hashPass = result.rows[0].passwordhash;
        const userId = result.rows[0].id;

        const isMatch = await bcrypt.compare(password, hashPass);

        if (!isMatch) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid username or password" }),
            };
        }

        const token = jwt.sign(
            { userId }, // Payload
            process.env.JWT_SECRET, // Secret key (store securely)
            { expiresIn: "1h" } // Token expiration
        );

        return {
            statusCode: 200,
            headers: {
                "Set-Cookie": `token=${token}; HttpOnly; SameSite=None; Secure; Path=/`,
            },
            body: JSON.stringify({ message: "Login successful" }),
        };

        
    } catch (error) {
        console.error("Database error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", issue: String(error) }),
        };
    } finally {
        await client.end();
    }


}