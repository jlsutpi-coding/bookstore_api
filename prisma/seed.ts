import prisma from "../src/lib/prisma";

async function main() {
  console.log("Starting database seeding...");

  // Delete child records first to prevent foreign key errors
  await prisma.order.deleteMany();
  await prisma.literaryTalk.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  // 1. Min Lu (Myanmar Author) with Books and Literary Talks
  await prisma.author.create({
    data: {
      name: "Min Lu",
      bio: "A famous Myanmar writer and poet known for modern satirical novels and poetry.",
      books: {
        create: [
          {
            title: "Pyu",
            isbn: "9789590000001",
            price: 5.5,
            genre: "Satire",
            stockQuantity: 40,
            publishedYear: 1985,
            youtubeUrl:
              "https://www.youtube.com/watch?v=sample_minlu_pyu_review",
          },
        ],
      },
      literaryTalks: {
        create: [
          {
            title: "Literature and Youth Perception",
            description:
              "A famous literary talk about the impact of reading on youth mindset.",
            youtubeUrl: "https://www.youtube.com/watch?v=sample_minlu_talk_1",
            eventDate: new Date("2012-05-15T00:00:00Z"),
            location: "Yangon",
          },
        ],
      },
    },
  });

  // 2. Ju (Myanmar Author) with Books and Literary Talks
  await prisma.author.create({
    data: {
      name: "Ju",
      bio: "One of the most popular contemporary Myanmar female novelists.",
      books: {
        create: [
          {
            title: "Remembrance",
            isbn: "9789590000002",
            price: 6.0,
            genre: "Romance / Drama",
            stockQuantity: 60,
            publishedYear: 1990,
            youtubeUrl:
              "https://www.youtube.com/watch?v=sample_ju_book_discussion",
          },
        ],
      },
      literaryTalks: {
        create: [
          {
            title: "Living with Books and Passion",
            description: "Keynote speech at Mandalay Literary Event.",
            youtubeUrl:
              "https://www.youtube.com/watch?v=sample_ju_mandalay_talk",
            eventDate: new Date("2018-11-20T00:00:00Z"),
            location: "Mandalay",
          },
        ],
      },
    },
  });

  // 3. J.K. Rowling
  await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      bio: "British author best known for the Harry Potter series.",
      books: {
        create: [
          {
            title: "Harry Potter and the Philosopher's Stone",
            isbn: "090989766",
            price: 19.99,
            genre: "Fantasy",
            stockQuantity: 50,
            publishedYear: 1997,
            youtubeUrl: "https://www.youtube.com/watch?v=sample_hp1_trailer",
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

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
