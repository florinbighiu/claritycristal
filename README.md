# ClarityCristal — Business Website

Production website for **ClarityCristal**, a professional glass and solar panel cleaning company based in Lanzarote, Spain. Built as a full freelance project from design to deployment.

**Live site:** [claritycristal.com](https://claritycristal.com)

---

## What I built

A conversion-focused marketing site with a lead generation system — designed to turn visitors into quote requests via WhatsApp and email.

- **Hero section** with animated background and dual CTA (WhatsApp + scroll-to-services)
- **Interactive before/after slider** — draggable and touch-enabled image comparison
- **3-tier pricing section** with highlighted popular plan
- **Multi-field contact form** with client-side validation, phone auto-formatting, and server-side email delivery
- **Floating WhatsApp button** with entrance animation (appears after 2.5s)
- **FAQ accordion**, values section, and service package cards
- **Structured data** (JSON-LD) for `LocalBusiness` and `FAQPage` schemas
- Full **Open Graph / Twitter Card** meta tags for social sharing

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS with custom design tokens |
| Email | Resend API |
| Fonts | Fraunces · Outfit · Bodoni Moda (Google Fonts) |
| Deployment | Vercel |

---

## Highlights

**Lead generation pipeline** — contact form submissions are validated client-side (regex for phone/email, required fields), then sent to the client's inbox via Resend with a styled HTML email template. WhatsApp integration provides a parallel low-friction contact path.

**Custom Tailwind design system** — extended with brand colors (`gold`, `volcanic`, `navy`, `ocean`, `pearl`), custom font families, and utility classes for glassmorphism cards, animated gradient buttons, noise texture overlay, and a before/after slider.

**Scroll animations** — custom `useScrollReveal()` hook using `IntersectionObserver` to trigger staggered fade-up animations as sections enter the viewport, with no external animation library.

**SEO-ready** — structured JSON-LD schemas, comprehensive meta tags, semantic HTML with ARIA labels, and smooth scrolling throughout.

**Responsive & accessible** — mobile-first layout, touch support on the before/after slider, focus-visible styles, and ARIA roles on all interactive elements.

---

## Project structure

```text
app/
├── page.tsx                  # Home (all sections composed here)
├── api/contact/route.ts      # POST endpoint — Resend email delivery
└── services/
    ├── residencial/          # Residential cleaning page
    ├── empresas/             # Business & hospitality page
    └── paneles/              # Solar panel cleaning page

components/
├── HeroSection.tsx
├── BeforeAfterSlider.tsx     # Drag/touch image comparison
├── ServicesSection.tsx
├── PricingSection.tsx
├── PacksSection.tsx
├── ContactSection.tsx        # Form with validation + Resend
├── FaqSection.tsx
├── ValuesSection.tsx
├── NavBar.tsx                # Scroll-aware sticky header
├── FloatingWhatsApp.tsx
└── Footer.tsx

lib/
└── data.ts                   # Centralized content (plans, services, FAQ, values)
```

---

## Running locally

```bash
npm install
# add RESEND_API_KEY to .env.local
npm run dev
```

---

Freelance project — design, development, and deployment by Florin Bighiu
