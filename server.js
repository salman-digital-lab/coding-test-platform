import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check for monitoring (Coolify, etc.)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes

// Submit test score
app.post("/api/submit-score", async (req, res) => {
  try {
    const { email, score, totalQuestions } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    if (score === undefined || !totalQuestions) {
      return res
        .status(400)
        .json({ error: "Score and totalQuestions are required" });
    }

    await db.submitScore(email, score, totalQuestions);
    res.json({ success: true, message: "Score submitted successfully" });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ error: "Failed to submit score" });
  }
});

// Get all results (admin)
app.get("/api/admin/results", async (req, res) => {
  try {
    const results = await db.getAllResults();
    res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

// Export results to CSV (admin)
app.get("/api/admin/export-csv", async (req, res) => {
  try {
    const results = await db.getAllResults();

    // CSV Header
    let csv = "Email,Score,Total Questions,Percentage,Submitted At\n";

    // CSV Rows
    results.forEach((row) => {
      const percentage =
        Math.round((row.score / row.total_questions) * 100) + "%";
      const date = new Date(row.submitted_at).toLocaleString().replace(",", "");
      // Escape fields if necessary
      csv += `${row.email},${row.score},${row.total_questions},${percentage},${date}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("test-results.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    res.status(500).send("Failed to export CSV");
  }
});

// Serve frontend pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Coding Test Platform running at http://localhost:${PORT}`);
  console.log(`   📝 Homepage: http://localhost:${PORT}/`);
  console.log(`   🔧 Admin: http://localhost:${PORT}/admin`);
  console.log(`   🏥 Health: http://localhost:${PORT}/health`);
});
