# Workspace Designer

Design your dream workspace and rent it — pick a desk, chair, and accessories, watch your setup come to life in real time, then check out.

<p align="center">
  <a href="https://www.desent.io/coding-test-2">Challenge</a> ·
  <a href="https://github.com/txufiknr/workspace-designer">Repository</a> ·
  <a href="https://workspace-designer-psi.vercel.app/">Live Demo</a>
</p>

## Features

- **Desk, Chair & Accessory Selection** — 2 desks, 1 chair, and 6 accessories (monitors, lamps, whiteboards) straight from the monis.rent catalog. Each item shows its monthly rental price.
- **Real Product Photos** — Every product uses the actual monis.rent product photo, not illustrations.
- **Live Workspace Preview** — Items spring-animate into a real-time preview as you select them. Drag accessories from the sidebar to add them, drag to reorder, or use the on-card buttons.
- **One-Click Persona Presets** — Developer, Designer, Writer, and Gamer presets that auto-fill your setup. A confirmation dialog with a full item breakdown protects existing selections, with a Replace / Keep buttons.
- **Product Info Modal** — Eye button on any product card opens details (category badge, price, description) with Add/Remove-to-setup.
- **Floating Cart + Drawer** — A cart FAB with item count badge opens a slide-in drawer showing your setup, per-item prices, and totals.
- **Rental Period Toggle** — Switch between daily / weekly / monthly pricing with an animated price counter.
- **Checkout Flow** — Confirmation dialog before renting, a success modal on completion, and auto-clear of the cart afterward.
- **Dark / Light Theme** — Sun/Moon toggle with `localStorage` persistence and no-flash init; semantic color tokens throughout.
- **Toast Notifications** — Non-intrusive feedback for every action: item added/removed, preset loaded, rent submitted, and errors.
- **Search & Collapsible Sidebar** — Filter products by name and collapse the sidebar for more preview space.
- **Config Persistence** — Your selections survive page refreshes via `localStorage`.
- **Persona Highlights** — Active preset is highlighted; the highlight clears as soon as you manually modify the setup.
- **Preview Backgrounds** — Four CSS-gradient moods (Classic, Rice Terrace, Sunset Beach, Coworking Loft) switchable from the preview.
- **Responsive & Polished** — Mobile-friendly layout, skeleton loading states, empty-state illustration, and Framer Motion micro-interactions throughout.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, React 19, Server Actions) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| State Management | React Context + `useReducer` |
| Icons | lucide-react |
| Package Manager | pnpm |

## Getting Started

```bash
# install dependencies
pnpm install

# lint and typecheck
pnpm check

# run the dev server
pnpm dev

# build for production
pnpm build

# start the production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/            # App Router root (layout, page, error, loading)
├── components/     # Feature components + reusable UI primitives
│   └── ui/         # Button, Card, Badge, IconButton, Skeleton, Toast,
│                   # Dialog, ConfirmDialog, ThemeToggle
├── context/        # Workspace state (Context + reducer)
├── hooks/          # useToast, useConfirmDialog
└── lib/            # Product data, presets, constants, backgrounds, server action
```

## Deployment

Deployed automatically to Vercel from GitHub on every push to the main branch.

## Author

**Taufik Nur Rahmanda**
taufik.nur.rahmanda93@gmail.com
