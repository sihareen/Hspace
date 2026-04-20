import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

async function ensureSchema() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AdminUser" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "email" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Project" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "techStack" TEXT NOT NULL,
      "externalUrl" TEXT NOT NULL,
      "coverImage" TEXT,
      "status" TEXT NOT NULL DEFAULT 'DRAFT',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");
  `);
}

async function main() {
  await ensureSchema();

  const email = process.env.ADMIN_EMAIL ?? "admin@hspace.local";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeThisPassword123!";
  const name = process.env.ADMIN_NAME ?? "Admin Hspace";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
    },
    create: {
      email,
      name,
      passwordHash,
    },
  });

  // Minimal starter content for admin panel verification.
  const existingProject = await prisma.project.findFirst({
    where: { slug: "starter-project" },
    select: { id: true },
  });

  if (!existingProject) {
    await prisma.project.create({
      data: {
        title: "Starter Project",
        slug: "starter-project",
        description: "Initial seeded project. Replace or edit from admin panel.",
        techStack: "Next.js, Prisma, Tailwind",
        externalUrl: "https://github.com/sihareen",
        status: "DRAFT",
      },
    });
  }

  console.log(`Seed complete. Admin email: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
