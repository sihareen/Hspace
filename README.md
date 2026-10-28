# Hspace Portfolio

High-contrast, Swiss-style engineering portfolio for an Electrical Engineering graduate specializing in IoT, Embedded Systems, and Telemetry.

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **Database**: Prisma + PostgreSQL
- **Design**: Minimalist Engineering Datasheet Aesthetic

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

## 🔐 Administration
The site includes a protected admin area for content management.
- **Login**: `/admin/login`
- **Project Management**: `/admin/projects`
- **Experience & Education**: `/admin/experiences`

## 📁 Project Structure
- `src/app`: Application routes and global styles.
- `src/components`: Modular UI components.
  - `/sections`: Main page sections (Hero, Projects, etc.).
  - `/shared`: Layout elements (Header, Footer).
  - `/ui`: Atomic design components.
- `src/data`: Static site configuration.
- `public`: Static assets.
  - `/project-covers`: Project thumbnail images.
  - `/profile`: Profile portrait.
  - `cv.pdf`: Professional resume.

## 📝 Design Notes
- **Aesthetic**: Rigid grid-based layout, bold typography, and high-contrast palette.
- **Accent Color**: `#ff4f00` (Engineering Orange).
- **Typeface**: Sans-serif for display, Monospace for technical metadata.
