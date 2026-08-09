import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { supabaseAdmin } from "../supabase.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/stats", async (_request, response) => {
  const [profiles, companies, jobs, applications] = await Promise.all([
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("companies").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("jobs").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("applications").select("id", { count: "exact", head: true })
  ]);

  return response.json({
    users: profiles.count ?? 0,
    companies: companies.count ?? 0,
    jobs: jobs.count ?? 0,
    applications: applications.count ?? 0
  });
});

router.get("/jobs", async (_request, response) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("*, companies(company_name)")
    .order("created_at", { ascending: false });

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

router.patch("/jobs/:id/approve", async (request, response) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .update({ status: "approved" })
    .eq("id", request.params.id)
    .select()
    .single();

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

router.patch("/jobs/:id/reject", async (request, response) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .update({ status: "rejected" })
    .eq("id", request.params.id)
    .select()
    .single();

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

export default router;
