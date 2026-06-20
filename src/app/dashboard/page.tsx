import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="stack">
      <section className="section">
        <h1>Dashboard</h1>
        <p>Vue d&apos;ensemble de l&apos;espace SaaS courant.</p>
      </section>
      <section className="section">
        <h2>Modules</h2>
        <p>
          <Link href="/dashboard/projects">Gerer les projets</Link>
        </p>
      </section>
    </main>
  );
}
