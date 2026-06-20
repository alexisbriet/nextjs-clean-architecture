import { connection } from "next/server";
import {
  createProjectAction,
  getProjectsForCurrentWorkspace,
} from "@/modules/projects";

export default async function ProjectsPage() {
  await connection();

  const projects = await getProjectsForCurrentWorkspace();

  return (
    <main className="stack">
      <section className="section">
        <h1>Projects</h1>
        <p>Un exemple de feature SaaS isolee en couches.</p>
        <form action={createProjectAction} className="form">
          <input
            className="input"
            name="name"
            placeholder="Nom du projet"
            required
            minLength={2}
            maxLength={80}
          />
          <button className="button" type="submit">
            Creer
          </button>
        </form>
      </section>
      <section className="section">
        <h2>Projets de l&apos;espace courant</h2>
        <div className="list">
          {projects.length > 0 ? (
            projects.map((project) => (
              <article className="list-item" key={project.id}>
                <strong>{project.name}</strong>
                <p>{project.slug}</p>
              </article>
            ))
          ) : (
            <p>Aucun projet pour le moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
