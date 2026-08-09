import type { NextFunction, Request, Response } from "express";
import { supabaseAdmin } from "../supabase.js";

export type AuthUser = {
  id: string;
  email?: string;
  role: "candidate" | "company" | "admin";
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function requireAuth(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return response.status(401).json({ message: "Missing bearer token" });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return response.status(401).json({ message: "Invalid session" });
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  request.user = {
    id: data.user.id,
    email: data.user.email,
    role: profile?.role ?? "candidate"
  };

  return next();
}

export function requireRole(...roles: AuthUser["role"][]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return response.status(403).json({ message: "Insufficient permissions" });
    }

    return next();
  };
}
