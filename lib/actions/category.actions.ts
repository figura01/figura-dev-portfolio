"use server";

import { z } from "zod";
import { insertCategorySchema, updateCategorySchema } from "../validators";
import { revalidatePath } from "next/cache";
import { PrismaClient, Prisma } from "@prisma/client";
// import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { PAGE_SIZE } from "../constants";

// Create a new category
export async function createCategory(
  data: z.infer<typeof insertCategorySchema>
) {
  const prisma = new PrismaClient();
  try {
    const category = insertCategorySchema.parse(data);
    const res = await prisma.category.create({ data: category });
    console.log("res", res);
    revalidatePath("/admin/products");
    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update the category
export async function updateCategory(
  data: z.infer<typeof updateCategorySchema>
) {
  const prisma = new PrismaClient();
  try {
    const currenCategory = await prisma.category.findFirst({
      where: { id: data.id },
    });

    if (!currenCategory) throw new Error("User not found");

    await prisma.category.update({
      where: { id: currenCategory.id },
      data: {
        label: data.label,
      },
    });

    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get categories
export async function getSetCategories() {
  const prisma = new PrismaClient();

  try {
    const res = await prisma.category.findMany({
      select: {
        id: true,
        label: true,
      },
    });
    if (!res) throw new Error("No categories founded");

    return {
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get All categories
export async function getAllCategories() {
  const prisma = new PrismaClient();
  const data = await prisma.category.findMany({
    select: {
      label: true,
      id: true,
    },
  });

  return {
    data,
  };
}

// Get one category by Id
export async function getCategoryById(categoryId: string) {
  const prisma = new PrismaClient();

  const category = await prisma.category.findFirst({
    where: { id: categoryId },
  });
  if (!categoryId) throw new Error("Category not found");
  return category;
}

// Get one category by Id
export async function deleteCategory(id: string) {
  const prisma = new PrismaClient();

  try {
    const categoryExists = await prisma.category.findFirst({
      where: { id },
    });

    if (!categoryExists) throw new Error("Category not found");

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
