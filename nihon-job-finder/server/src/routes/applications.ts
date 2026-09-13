import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { supabaseAdmin } from "../supabase.js";

const router = Router();

const applicationSchema = z.object({
  job_id: z.string().uuid(),
  message: z.string().max(1200).optional()
});

router.post("/", requireAuth, requireRole("candidate"), async (request, response) => {
  const payload = applicationSchema.parse(request.body);
  const { data, error } = await supabaseAdmin
    .from("applications")
    .insert({
      ...payload,
      candidate_id: request.user!.id
    })
    .select()
    .single();

  if (error) return response.status(500).json({ message: error.message });
  return response.status(201).json(data);
});

router.get("/me", requireAuth, requireRole("candidate"), async (request, response) => {
  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*, jobs(title, prefecture, city, companies(company_name))")
    .eq("candidate_id", request.user!.id)
    .order("created_at", { ascending: false });

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

router.get("/company", requireAuth, requireRole("company", "admin"), async (_request, response) => {
  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*, jobs(title, company_id), profiles(full_name, japanese_level, visa_type)");

  if (error) return response.status(500).json({ message: error.message });
  return response.json(data);
});

export default router;
