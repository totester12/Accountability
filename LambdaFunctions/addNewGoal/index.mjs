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
    ssl: { rejectUnauthorized: false }
  };

  // Extract JWT from cookies
  const cookies = event.cookies;
  const tokenCookie = cookies.find(cookie => cookie.startsWith("goaltoken="));
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: "Missing JWT token" }) };
  }

  try {
    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userId;  

    if (!userid) {
      return { statusCode: 401, body: JSON.stringify({ error: "Invalid or expired token" }) };
    }

    const data = JSON.parse(event.body);
    const { title, duration } = data;

    if (!title || !duration) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields: title, duration" }) };
    }

    const client = new Client(dbConfig);
    await client.connect();

    // Corrected INSERT statement
    const query = `
      INSERT INTO goals (id, userid, title, duration, startdate, lastcheckin, status)
      VALUES (gen_random_uuid(), $1, $2, $3, CURRENT_DATE, CURRENT_DATE, 'Active')
      RETURNING id;
    `;

    await client.query(query, [userid, title, duration]);

    await client.end();

    return { statusCode: 201, body: JSON.stringify({ message: "Goal added successfully" }) };

  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error", issue: String(error) }) };
  }
};
