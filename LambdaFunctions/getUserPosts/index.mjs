import pkg from "pg";
const { Client } = pkg;


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

  // Extract user details from event body, we'd get this 
  const data = JSON.parse(event.body);
  const userid = data.userid
  

  if (!userid ) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields, expecting username" }),
    };
  }

  const client = new Client(dbConfig);

  try {
    await client.connect();

    const query = `
      select * from goals where userid = $1;;
    `;

    const result = await client.query(query, [userid]);

    return {
      statusCode: 201,
      body: JSON.stringify(result.rows),
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
