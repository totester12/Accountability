import pkg from "pg";
const { Client } = pkg;
import jwt from "jsonwebtoken";  // Importing jwt to decode and verify the token

export const handler = async (event) => {

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

  // Extract the JWT token from the cookies in the request headers
  const cookies = event.cookies;
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));

  const token = tokenCookie ? tokenCookie.split('=')[1] : null;

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing JWT token" }),
    };
  }

  try {
    // Verify and decode the JWT token to extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userId;  // Assuming userId is inside the token payload

    if (!userid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid or expired token" }),
      };
    }

    // Now use the userId to query the database for the user's goals
    const client = new Client(dbConfig);

    await client.connect();

    const query = `
      SELECT * FROM goals WHERE userid = $1;
    `;

    const result = await client.query(query, [userid]);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", issue: String(error) }),
    };
  }
};
