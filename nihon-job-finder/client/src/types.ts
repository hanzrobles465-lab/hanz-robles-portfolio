export type Role = "candidate" | "company" | "admin";

export type Job = {
  id: string;
  title: string;
  description: string;
  prefecture: string;
  city: string;
  salary_min: number;
  salary_max: number;
  japanese_level: string;
  visa_type: string;
  contract_type: string;
  remote_type: string;
  status: "pending" | "approved" | "rejected";
  companies?: {
    company_name: string;
    logo_url?: string;
  };
};
