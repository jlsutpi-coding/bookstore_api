import prisma from "../src/lib/prisma";

async function main() {
  console.log("Starting database seeding...");

  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
}
main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
