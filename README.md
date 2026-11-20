# Blackroid client portfolio preview

This is the complete standalone source for the client project workspace. It
preserves the original Blackroid portfolio component, styling, animations,
header, footer, cookie banner, and brand assets. The workspace is available at
both `/` and `/portfolio`.

## What the page contains

The original request was a white, corporate client workspace with no more than
four tabs, showing the current project, progress, team, invoices/payments, and
a place to suggest changes. The implementation uses Blackroid's premium
typography, colors, buttons, cards, icons, and subtle animations.

- **Overview:** sample project name and reference, progress bar and percentage,
  status, handover date, next milestone, and invoice to review. Buttons open
  the relevant tabs.
- **Progress:** milestone timeline and a suggestion form (up to 1,000
  characters). Notes appear immediately in the page for the current session.
- **Team:** project lead, product designer and engineering team, with an email
  link.
- **Invoices:** sample amounts, dates and paid/unpaid statuses; the unpaid
  invoice has an email link to request payment details.
- **Sidebar:** project details, support email and a sample-workspace notice.
- Responsive layouts, animated transitions and reduced-motion support are
  included. The header, footer, mobile menu and cookie notice are also included.

## Important: preview only

Everything displayed is sample data, not a live client portal. Suggestions
exist only in browser memory and disappear on refresh; they are not sent to
the team. Invoice entries are not real, payments are not processed, and no
invoice downloads are provided. There is no authentication, authorization,
database, API, or private client data isolation. Do **not** enter real client,
financial, or confidential information into this preview or present it as a
secure portal.

The original preview shows a milestone timeline but has no external link to a
live work-in-progress deliverable. Add a verified project-specific link when
that functionality is implemented.

A real portal requires server-side authentication and per-client authorization,
secure storage and APIs for projects, milestones, team, invoices and
suggestions, appropriate payment/invoice integrations, error handling,
backups, auditing, and privacy/security review before use. The original page
does not implement those features.

## Run locally

Requirements: Node.js 22.x and npm. Internet access is needed for npm
dependencies and Google fonts during a production build.

1. Copy the entire contents of this folder into your new project folder.
2. Open a terminal in that folder.
3. Optionally copy `.env.example` to `.env.local` and change the values:

   ```powershell
   Copy-Item .env.example .env.local
   ```

4. Install and start:

   ```powershell
   npm ci
   npm run dev
   ```

5. Open `http://localhost:3000` (or `http://localhost:3000/portfolio`).
   Stop the server with Ctrl+C.

Other commands: `npm run typecheck`, `npm run lint`, `npm run build`, and
`npm start` (after a successful build).

## Create a separate GitHub repository

1. Create a new, empty repository on GitHub (prefer private until ready).
2. In your local project folder, run:

   ```powershell
   git init
   git add .
   git commit -m "Add client portfolio preview"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

Replace the remote URL with your repository's actual URL. Do not copy
`node_modules`, `.next`, or `.env.local` into Git; `.gitignore` excludes them.

## Configuration and customization

- `NEXT_PUBLIC_MAIN_WEBSITE_URL` is the main marketing site's URL. It defaults
  to `https://blackroid.com` as an example; confirm and change it as needed.
  Header, footer and privacy links go there rather than to missing routes in
  this standalone project.
- `NEXT_PUBLIC_CONTACT_EMAIL` changes the public support email. The default is
  defined in `src/lib/site.ts`.
- `NEXT_PUBLIC_CLIENT_PORTAL_URL` controls the header/footer Login link. If
  empty, it points to the main site's `/login`. This project does not provide
  a login system.
- `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, and
  `NEXT_PUBLIC_X_URL` configure social links. Unset links retain the original
  placeholder behavior. WhatsApp and telephone details are in `src/lib/site.ts`.
- All `NEXT_PUBLIC_` values are public, not secrets. Set the same values in
  your hosting provider and rebuild after changing them.
- Edit the sample data, labels and UI in `src/components/ClientPortfolio.tsx`:
  the `milestones`, `invoices`, and `team` arrays are near the top; the
  project and sidebar values are in the JSX.
- Colors, fonts, spacing helpers and design tokens are in
  `src/app/globals.css`; Google fonts and the common layout are in
  `src/app/layout.tsx`. Original brand images are under `public/brand`.
- The package uses the original project's package manifest and lockfile, so
  some dependencies support the wider original site rather than this page.

## Deploy

Import `Mabasa-Systems-Technology/Portal.blackroid.com` into Vercel using:

- **Production branch:** `main`
- **Root Directory:** the repository root (leave empty)
- **Framework Preset:** Next.js
- **Node.js version:** 22.x
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (the Next.js default)

The committed `vercel.json` sets the framework and build commands. Do not use
`npm start` as the build command or select `public` or `out` as the output
directory. Vercel serves the Next.js build directly.

Environment variables in `.env.example` are optional for the sample workspace;
no database, SMTP, or authentication credentials are required to render it.
Set any desired public values in Vercel before building. After changing project
settings, redeploy the latest `main` commit with the build cache disabled.
Verify that both `/` and `/portfolio` load and that the four workspace tabs work.

The page carries a
`noindex` instruction, but this is not access control; a deployed URL is still
public unless your host enforces access restrictions.

Before deploying dependency updates, run `npm ci`, `npm run lint`,
`npm run typecheck`, and `npm run build`.
