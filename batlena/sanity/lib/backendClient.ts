// sanity/lib/backendClient.ts
import { createClient } from "@sanity/client";

export const backendClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_STRIPE_API_TOKEN!,
  useCdn: false,
});
