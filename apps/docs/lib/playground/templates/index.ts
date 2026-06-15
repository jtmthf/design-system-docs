import type { Spec } from "@json-render/core";

import contactForm from "./contact-form.json";
import loginForm from "./login-form.json";
import pricingPage from "./pricing-page.json";
import profileCard from "./profile-card.json";

/**
 * Pre-generated, verified specs for the playground's "Start from a template"
 * chips. Loaded instantly client-side (no `/api/playground/generate` call), so
 * templates never hit the generation timeout. Regenerate with
 * `node scripts/build-template-specs.mjs` and re-verify before committing.
 */
export const templates: { id: string; label: string; spec: Spec }[] = [
  { id: "login-form", label: "Login form", spec: loginForm as Spec },
  { id: "pricing-page", label: "Pricing page", spec: pricingPage as Spec },
  { id: "profile-card", label: "Profile card", spec: profileCard as Spec },
  { id: "contact-form", label: "Contact form", spec: contactForm as Spec },
]
