import { connection } from "next/server";
import {
  createBillingPortalSessionAction,
  createCheckoutSessionAction,
  getBillingProfileForCurrentWorkspace,
} from "@/modules/billing";

export default async function BillingPage() {
  await connection();

  const billingProfile = await getBillingProfileForCurrentWorkspace();
  const subscription = billingProfile?.subscription;

  return (
    <main className="stack">
      <section className="section">
        <h1>Billing</h1>
        <p>Gestion du plan et de l&apos;abonnement du workspace courant.</p>
        <div className="form">
          <form action={createCheckoutSessionAction}>
            <button className="button" type="submit">
              Passer au plan Pro
            </button>
          </form>
          <form action={createBillingPortalSessionAction}>
            <button className="button" type="submit">
              Gerer la facturation
            </button>
          </form>
        </div>
      </section>
      <section className="section">
        <h2>Etat local</h2>
        <div className="list">
          <article className="list-item">
            <strong>Plan</strong>
            <p>{billingProfile?.plan ?? "Inconnu"}</p>
          </article>
          <article className="list-item">
            <strong>Abonnement</strong>
            <p>{subscription?.status ?? "Aucun abonnement actif"}</p>
          </article>
          <article className="list-item">
            <strong>Fin de periode</strong>
            <p>{subscription?.currentPeriodEnd ?? "Non disponible"}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
