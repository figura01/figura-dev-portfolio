import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  try {
    await prisma.category.deleteMany(); // Clear existing products
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();

    await prisma.category.createMany({ data: sampleData.categories });
    await prisma.user.createMany({ data: sampleData.users });

    console.log("Sample data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

main();
