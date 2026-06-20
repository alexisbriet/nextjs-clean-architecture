import Link from "next/link";

export default function HomePage() {
  return (
    <main className="stack">
      <section className="section">
        <h1>Clean architecture Next.js pour SaaS</h1>
        <p>
          Le router Next reste dans src/app, le metier vit dans src/modules, et
          l&apos;infrastructure est injectee par les cas d&apos;usage.
        </p>
      </section>
      <section className="section">
        <h2>Point de depart</h2>
        <p>
          Ouvre le dashboard pour voir un module SaaS multi-tenant minimal avec
          actions serveur, repository Prisma et regles de domaine.
        </p>
        <p style={{ marginTop: 16 }}>
          <Link href="/dashboard/projects">Aller aux projets</Link>
        </p>
      </section>
    </main>
  );
}
