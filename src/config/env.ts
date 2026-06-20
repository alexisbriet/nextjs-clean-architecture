type AppEnv = {
  databaseUrl?: string;
  nodeEnv: "development" | "test" | "production";
  appUrl: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  stripeProPriceId?: string;
};

export const env: AppEnv = {
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
      ? process.env.NODE_ENV
      : "development",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  stripeProPriceId: process.env.STRIPE_PRO_PRICE_ID,
};
