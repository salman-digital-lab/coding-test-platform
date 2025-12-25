import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database tables
async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ PostgreSQL database initialized");
  } finally {
    client.release();
  }
}

// Initialize on module load
initDatabase().catch(console.error);

const dbModule = {
  // Submit or update a test score by email
  submitScore: async (email, score, totalQuestions) => {
    const result = await pool.query(
      `
      INSERT INTO results (email, score, total_questions, submitted_at) 
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT(email) DO UPDATE SET 
        score = EXCLUDED.score,
        total_questions = EXCLUDED.total_questions,
        submitted_at = CURRENT_TIMESTAMP
      RETURNING *
    `,
      [email, score, totalQuestions]
    );
    return result.rows[0];
  },

  // Get all results
  getAllResults: async () => {
    const result = await pool.query(`
      SELECT id, email, score, total_questions, submitted_at
      FROM results
      ORDER BY submitted_at DESC
    `);
    return result.rows;
  },
};

export default dbModule;
