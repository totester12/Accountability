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
  const { username, passwordHash } = event;

  if (!username || !passwordHash) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
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

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created", userId }),
    };

  } catch (error) {
    console.error("Database error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  } finally {
    await client.end();
  }
};
