# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server at localhost:3000
npm run build     # Production build
npm run lint      # Run ESLint
```

### Database

```bash
npx drizzle-kit generate   # Generate migrations from schema changes
npx drizzle-kit push       # Push schema to database (no migration files)
npx tsx db/seed.ts         # Seed the database
```

## Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
DATABASE_URL=...
```

## Architecture

**iBuiltThis** is a product launch/showcase community platform (similar to Product Hunt). Creators submit apps, AI tools, and SaaS products for upvoting and discovery.

### Stack

- **Next.js 16** (App Router) with React 19
- **TypeScript** with Tailwind CSS v4
- **Clerk** — authentication, wraps the entire app in `ClerkProvider` (in `app/layout.tsx`). Clerk middleware lives in `proxy.ts` (note: named `proxy.ts`, not `middleware.ts`)
- **Neon** (serverless Postgres) + **Drizzle ORM** — database layer in `db/`
- **shadcn/ui** — component library (add components with `npx shadcn@latest add <component-name>`)

### Project Structure

```
ibuiltthis-app/
├── app/
│   ├── layout.tsx              # Root layout — ClerkProvider, Header, Footer, Outfit font
│   ├── page.tsx                # Homepage (HeroSection, FeaturedProducts, RecentlyLaunched)
│   ├── globals.css
│   ├── preview/
│   │   └── page.tsx            # Component preview/sandbox page
│   └── products/
│       ├── page.tsx            # All products listing
│       └── [id]/
│           └── page.tsx        # Product detail page
├── hooks/                      # Custom React hooks (e.g. useProducts, useProduct)
├── components/
│   ├── common/                 # Shared layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── section-header.tsx
│   │   └── empty-state.tsx
│   ├── landing-page/           # Homepage-specific sections
│   │   ├── hero-section.tsx
│   │   ├── featured-products.tsx
│   │   ├── recently-launched-products.tsx
│   │   └── stats-card.tsx
│   ├── products/               # Product-related components
│   │   └── product-card.tsx
│   └── ui/                     # shadcn/ui primitives (badge, button, card)
├── db/
│   ├── index.ts                # Neon HTTP client + Drizzle instance
│   ├── schema.ts               # Drizzle table definitions
│   ├── data.ts                 # Seed data
│   └── seed.ts                 # Seed script
├── drizzle/                    # Auto-generated migration files (do not edit)
├── lib/
│   └── utils.ts                # cn() Tailwind class merge utility
├── proxy.ts                    # Clerk middleware (note: not middleware.ts)
├── drizzle.config.ts
└── next.config.ts
```

### Database Schema

Single `products` table with:

- Core fields: `name`, `slug` (unique), `tagline`, `description`, `websiteUrl`, `tags` (JSON array)
- Status workflow: `status` enum — `pending | approved | rejected`
- Auth: `userId` (Clerk user ID), `organizationId` (Clerk org ID), `submittedBy`
- Voting: `voteCount`

### Key Patterns

- Clerk's `params` in dynamic routes are `Promise<{ id: string }>` — always `await params` before destructuring (Next.js 16 requirement)
- Font: Outfit from Google Fonts (replaces default Geist)
- Component caching enabled via `cacheComponents: true` in `next.config.ts`
