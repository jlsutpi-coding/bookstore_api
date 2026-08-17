import prisma from "../src/lib/prisma";

async function main() {
  console.log("Starting database seeding...");

  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.order.deleteMany();

  const author1 = await prisma.author.create({
    data: {
      name: "J.K Rowling",
      bio: "British author best known for the Harry Potter series. ",
      books: {
        create: [
          {
            title: "Harry Potter and the Philosopher's Stone",
            isbn: "090989766",
            price: 19.99,
            genre: "Fantasy",
            stockQuantity: 50,
            publishedYear: 1997,
          },
          {
            title: "Harry Potter and the Chamber of Secrets",
            isbn: "9780747538493",
            price: 21.99,
            genre: "Fantasy",
            stockQuantity: 35,
            publishedYear: 1998,
          },
        ],
      },
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "George R.R Martin",
      bio: "American novelist and short story writer.",
      books: {
        create: [
          {
            title: "A Game of Thrones",
            isbn: "9780553103540",
            price: 25.0,
            genre: "Epic Fantasy",
            stockQuantity: 20,
            publishedYear: 1996,
          },
        ],
      },
    },
  });

  console.log(" Seeding completed successfully!");
}
main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
