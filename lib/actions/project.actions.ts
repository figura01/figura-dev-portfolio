"use server";
import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
import { formatError, convertToPlainObject } from "@/lib/utils";
import { insertProjectSchema, updateProjectSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { PAGE_SIZE } from "../constants";

// Create a new product
export async function createProject(data: z.infer<typeof insertProjectSchema>) {
  const prisma = new PrismaClient();
  try {
    const project = insertProjectSchema.parse(data);
    const { category, ...rest } = project;
    await prisma.project.create({
      data: {
        ...rest,
        // category is a relation, connect by id
        category: {
          connect: { id: category },
        },
      },
    });
    revalidatePath("/admin/projects");
    return {
      success: true,
      message: "Prodjet created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update an existing product
export async function updateProject(data: z.infer<typeof updateProjectSchema>) {
  const prisma = new PrismaClient();
  try {
    const project = updateProjectSchema.parse(data);
    const projectExists = await prisma.project.findFirst({
      where: { id: project.id },
    });

    if (!projectExists) throw new Error("Project not found");
    const { categoryId, ...rest } = projectExists;
    await prisma.project.update({
      where: { id: project.id },
      data: {
        ...rest,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    revalidatePath("/admin/projects");

    return {
      success: true,
      message: "Project updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get all products
export async function getAllProjects({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.ProjectWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Category Filter

  const categoryFilter = category && category !== "all" ? { category } : {};

  const prisma = new PrismaClient();
  const data = await prisma.project.findMany({
    where: {
      ...queryFilter,
      category: { label: category },
    },
    orderBy: sort === "lowest" ? { createdAt: "desc" } : { createdAt: "asc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      category: true,
    },
  });

  const dataCount = await prisma.project.count();
  console.log("data: ", data, "typeof data: ", typeof data);
  return {
    data: convertToPlainObject(data),
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProject(id: string) {
  const prisma = new PrismaClient();
  try {
    const projectExists = await prisma.project.findFirst({
      where: { id },
    });

    if (!projectExists) throw new Error("Project not found");

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get single Product by it's id
export async function getProjectById(projectId: string) {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.project.findFirst({
      where: { id: projectId },
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error(`Error fetching project with id ${projectId}:`, error);
  }
}
