# PLAN: Upgrade Portfolio ke Next.js (Aligned with AGENTS.md)

## 1) Objective
Upgrade website portfolio saat ini menjadi aplikasi modern berbasis React dengan default implementasi **Next.js + Tailwind CSS**, dengan fokus:
1. Admin page untuk kelola project tanpa hardcode.
2. Visual **futuristic dark** yang bersih, profesional, dan ringan.
3. Struktur konten publik wajib: **Hero → About → Projects → Tech Stack → Contact**.
4. Tetap sederhana, tanpa dashboard IoT/live data visualization yang kompleks.

---

## 2) Requirement Mapping (from AGENTS.md)
### Product Direction
- Personal portfolio untuk IoT & AI Engineer.
- Tujuan: showcase project engineering secara modern dan profesional.
- Hindari kompleksitas UI yang tidak perlu.

### Tech Direction
- Baseline implementasi: **Next.js (React) + Tailwind CSS**.
- Interaktivitas: JavaScript seperlunya (subtle).
- Target deployment: **Vercel** (utama), kompatibel Netlify/GitHub Pages untuk versi statis.

### UI/UX Direction
- Primary background: `#0b0f19`.
- Dark mode, minimalis, futuristic, neon accent halus (blue/purple).
- Typography bersih dan hierarki visual jelas.
- Animasi halus, tidak berat/distracting.

### Hard Rules
- Gunakan semantic HTML/komponen modular.
- Hindari inline style.
- Wajib responsive semua ukuran layar.
- Dilarang memasukkan IoT dashboard atau visualisasi live data.
- Dilarang background terang.

---

## 3) Functional Scope
### Public Site
- `/` berisi section berurutan:
  1. Hero (headline + subtitle + CTA)
  2. About
  3. Projects (card-based)
  4. Tech Stack (ikon + grid)
  5. Contact
- Tiap project card minimal memuat:
  - Title
  - Description
  - Tech stack
  - External link (GitHub/demo)

### Admin
- `/admin/login`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- Operasi CRUD project agar konten tidak hardcoded.

### Data Model Minimum
- `Project`
  - `id`, `title`, `slug`, `description`, `techStack`, `externalUrl`, `coverImage`, `status`, `createdAt`, `updatedAt`
- `AdminUser`
  - `id`, `email`, `passwordHash`, `name`, `createdAt`, `updatedAt`

---

## 4) Architecture Decision
### App Layer
- Next.js App Router + TypeScript.
- Tailwind CSS + design token custom (dark futuristic).

### Backend Layer
- Route Handlers/Server Actions untuk CRUD.
- Zod untuk validasi input.

### Persistence
- Prisma ORM + PostgreSQL (prod).
- SQLite opsional untuk local quick start.

### Auth
- Auth.js/NextAuth credentials untuk admin minimal.
- Middleware proteksi route `/admin/*`.

---

## 5) 4-Phase Execution Plan
## Phase 1 - Foundation & Migration
**Goal:** pindah dari static site ke fondasi Next.js yang siap dikembangkan.
- Bootstrap Next.js + TypeScript + Tailwind.
- Set design token global sesuai AGENTS (`#0b0f19`, neon blue/purple).
- Migrasi konten existing ke section structure wajib.
- Setup linting, formatting, dan struktur folder modular.

**Deliverable:** website Next.js berjalan, section wajib sudah ada, style baseline dark futuristic aktif.

## Phase 2 - Admin CMS Core
**Goal:** hilangkan hardcode project melalui admin sederhana.
- Setup Prisma + database + migration.
- Implement authentication admin (login/logout).
- Implement CRUD project (create/read/update/delete).
- Validasi form + error handling + feedback.

**Deliverable:** admin bisa mengelola project dari UI, data tersimpan di DB.

## Phase 3 - Public Experience & Design Polish
**Goal:** presentasi portfolio profesional sesuai design principles.
- Render Projects section dari DB (published projects).
- Implement project card sesuai guidelines (title/desc/tech/external link).
- Build Tech Stack grid dengan ikon.
- Polish UI: spacing consistency, readability, responsive refinement, subtle animation.

**Deliverable:** halaman publik final feel “minimalist futuristic” dan tetap ringan.

## Phase 4 - QA, Performance, Deployment
**Goal:** siap rilis dengan kualitas produksi.
- Functional QA (admin flow + public flow).
- Responsive QA (mobile/tablet/desktop).
- Performance pass (image optimization, bundle hygiene, fast loading).
- Final deployment ke Vercel + env setup.

**Deliverable:** production URL aktif, stabil, cepat, dan sesuai checklist kualitas.

---

## 6) Acceptance Criteria
1. Admin dapat login dan melakukan CRUD project tanpa edit source code.
2. Section publik urut tepat: Hero, About, Projects, Tech Stack, Contact.
3. Semua project card memuat title, description, tech stack, dan external link.
4. UI dark futuristic konsisten, tanpa bright background.
5. Tidak ada dashboard IoT/live data visualization.
6. Animasi subtle dan tidak mengganggu.
7. Website responsive dan fast-loading.

---

## 7) Future Backlog (Non-Blocking)
- Blog section.
- Project filtering.
- Dark/light toggle.
