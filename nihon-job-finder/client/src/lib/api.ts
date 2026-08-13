import { supabase } from "./supabase";
import type { Job } from "../types";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getJobs(filters: Record<string, string> = {}): Promise<Job[]> {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${apiUrl}/jobs?${params}`);
  return response.json();
}

export async function applyToJob(jobId: string, message: string) {
  const response = await fetch(`${apiUrl}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeaders())
    },
    body: JSON.stringify({ job_id: jobId, message })
  });

  return response.json();
}

export async function approveJob(jobId: string) {
  const response = await fetch(`${apiUrl}/admin/jobs/${jobId}/approve`, {
    method: "PATCH",
    headers: await authHeaders()
  });

  return response.json();
}
