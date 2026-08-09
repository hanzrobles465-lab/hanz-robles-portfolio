import { useEffect, useMemo, useState } from "react";
import { getJobs } from "./lib/api";
import { supabase } from "./lib/supabase";
import type { Job } from "./types";

const demoJobs: Job[] = [
  {
    id: "demo-1",
    title: "Frontend Developer",
    description: "Build responsive websites and frontend interfaces using React, WordPress and API data.",
    prefecture: "Aichi",
    city: "Nagoya",
    salary_min: 260000,
    salary_max: 340000,
    japanese_level: "N3",
    visa_type: "Spouse visa OK",
    contract_type: "Seishain",
    remote_type: "Hybrid",
    status: "approved",
    companies: { company_name: "Nagoya Web Studio" }
  }
];

function formatSalary(job: Job) {
  if (!job.salary_min && !job.salary_max) return "Salary open";
  if (job.salary_min && job.salary_max) return `¥${job.salary_min.toLocaleString()} - ¥${job.salary_max.toLocaleString()}`;
  return `From ¥${(job.salary_min ?? job.salary_max)?.toLocaleString()}`;
}

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(demoJobs);
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Demo lista. Conecta la API para cargar datos reales.");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getJobs()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
          setStatus("Trabajos cargados desde Express API y Supabase.");
        }
      })
      .catch(() => setStatus("Usando datos demo mientras la API local no esté activa."));
  }, []);

  const stats = useMemo(
    () => [
      { label: "Empleos", value: jobs.length },
      { label: "Auth", value: isLoggedIn ? "Activa" : "Lista" },
      { label: "API", value: status.includes("Express") ? "Online" : "Demo" }
    ],
    [isLoggedIn, jobs.length, status]
  );

  async function signIn() {
    setStatus("Validando credenciales con Supabase...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoggedIn(false);
      setStatus(error.message);
      return;
    }

    setIsLoggedIn(true);
    setStatus("Login correcto con Supabase Auth.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setPassword("");
    setStatus("Sesión cerrada.");
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">React + TypeScript + Supabase</p>
          <h1>Nihon Job Finder</h1>
          <p>
            Plataforma de empleo para extranjeros en Japón con login real,
            API propia, base de datos PostgreSQL y flujo de administración.
          </p>
        </div>

        <div className="hero-badges">
          <span>Node/Express API</span>
          <span>Supabase Auth</span>
          <span>PostgreSQL</span>
        </div>
      </section>

      <section className="stats" aria-label="Estado del proyecto">
        {stats.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="grid">
        <aside className="panel login-panel">
          <div className="panel-heading">
            <p className="eyebrow">Supabase Auth</p>
            <h2>{isLoggedIn ? "Sesión iniciada" : "Login real"}</h2>
          </div>

          <label>Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

          <button onClick={isLoggedIn ? signOut : signIn}>
            {isLoggedIn ? "Cerrar sesión" : "Entrar con Supabase"}
          </button>

          <p className={isLoggedIn ? "status status-ok" : "status"}>{status}</p>
        </aside>

        <section className="panel jobs-panel">
          <div className="panel-heading jobs-heading">
            <div>
              <p className="eyebrow">GET /api/jobs</p>
              <h2>Trabajos</h2>
            </div>
            <span>{jobs.length} resultado</span>
          </div>

          {jobs.map((job) => (
            <article className="job" key={job.id}>
              <div>
                <p>{job.companies?.company_name ?? "Company"}</p>
                <h3>{job.title}</h3>
                <span>
                  {job.city}, {job.prefecture} | {job.japanese_level} | {job.visa_type}
                </span>
              </div>

              <dl>
                <div>
                  <dt>Contrato</dt>
                  <dd>{job.contract_type}</dd>
                </div>
                <div>
                  <dt>Modalidad</dt>
                  <dd>{job.remote_type}</dd>
                </div>
                <div>
                  <dt>Salario</dt>
                  <dd>{formatSalary(job)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

