import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve all static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,  "main.html"));
});

app.get("/chatbot.html", (req, res) => {
  res.sendFile(path.join(__dirname,  "chatbot.html"));
});

app.get("/ai.html", (req, res) => {
  res.sendFile(path.join(__dirname,  "ai.html"));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
