import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
