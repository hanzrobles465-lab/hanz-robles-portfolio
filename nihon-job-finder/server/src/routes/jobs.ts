import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { supabaseAdmin } from "../supabase.js";

const router = Router();

const jobSchema = z.object({
  company_id: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(20),
  prefecture: z.string().min(2),
  city: z.string().min(2),
  salary_min: z.number().int().optional(),
  salary_max: z.number().int().optional(),
  japanese_level: z.string().min(2),
  visa_type: z.string().min(2),
  contract_type: z.string().min(2),
  remote_type: z.string().default("onsite")
});

router.get("/", async (request, response) => {
  const { prefecture, japanese_level, visa_type, contract_type } = request.query;

  let query = supabaseAdmin
    .from("jobs")
    .select("*, companies(company_name, logo_url)")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (prefecture) query = query.eq("prefecture", String(prefecture));
  if (japanese_level) query = query.eq("japanese_level", String(japanese_level));
  if (visa_type) query = query.eq("visa_type", String(visa_type));
  if (contract_type) query = query.eq("contract_type", String(contract_type));

  const { data, error } = await query;

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

router.get("/:id", async (request, response) => {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("*, companies(company_name, website, logo_url)")
    .eq("id", request.params.id)
    .single();

  if (error) return response.status(404).json({ message: "Job not found" });
  return response.json(data);
});

router.post("/", requireAuth, requireRole("company", "admin"), async (request, response) => {
  const payload = jobSchema.parse(request.body);
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .insert({ ...payload, status: "pending" })
    .select()
    .single();

  if (error) return response.status(500).json({ message: error.message });
  return response.status(201).json(data);
});

router.put("/:id", requireAuth, requireRole("company", "admin"), async (request, response) => {
  const payload = jobSchema.partial().parse(request.body);
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .update(payload)
    .eq("id", request.params.id)
    .select()
    .single();

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

router.delete("/:id", requireAuth, requireRole("company", "admin"), async (request, response) => {
  const { error } = await supabaseAdmin.from("jobs").delete().eq("id", request.params.id);

  if (error) return response.status(500).json({ message: error.message });
  return response.status(204).send();
});

export default router;
