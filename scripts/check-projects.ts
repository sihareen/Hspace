import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 12,
    select: {
      title: true,
      slug: true,
      status: true,
      techStack: true,
    },
  });

  rows.forEach((row, i) => {
    console.log(`${i + 1}. [${row.status}] ${row.title} | ${row.slug} | ${row.techStack}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
