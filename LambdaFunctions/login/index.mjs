import pkg from "pg";
const { Client } = pkg;
import bcrypt from 'bcryptjs';

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
          SELECT passwordhash FROM users WHERE username = $1;
        `;
    
        const result = await client.query(query, [username]);
        //const hashPass = result.rows[0].passwordhash;
        
    
        return {
          statusCode: 201,
          body: JSON.stringify({ message: result.rows[0] }),
        };
    
      } catch (error) {
        console.error("Database error:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Internal Server Error", issue : String(error) }),
        };
      } finally {
        await client.end();
      }


}