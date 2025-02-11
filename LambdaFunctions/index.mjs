import pkg from "pg";
const { Client } = pkg;

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
  const passwordHash = data.passwordHash;

  if (!username || !passwordHash) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields, expecting username, passwordHash" }),
    };
  }

  const client = new Client(dbConfig);

  try {
    await client.connect();

    const query = `
      INSERT INTO users (id, username, passwordHash, createdAt) 
      VALUES (gen_random_uuid(), $1, $2, NOW()) 
      RETURNING id;
    `;

    const result = await client.query(query, [username, passwordHash]);
    const userId = result.rows[0].id;
    const userName2 = String(result.rows[0].username);
    

    const succString = `User ${userName2} created with id ${userId} `

    return {
      statusCode: 201,
      body: JSON.stringify({ message: succString }),
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
};
