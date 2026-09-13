import "dotenv/config";
import cors from "cors";
import express from "express";
import adminRoutes from "./routes/admin.js";
import applicationsRoutes from "./routes/applications.js";
import jobsRoutes from "./routes/jobs.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "nihon-job-finder-api" });
});

app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Nihon Job Finder API running on http://localhost:${port}`);
});
