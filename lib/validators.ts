import { z } from "zod";

// Schema for insert Category
export const insertCategorySchema = z.object({
  label: z.string().min(3, "Name must be at least 3 characters"),
});

// Schema for updating Category
export const updateCategorySchema = insertCategorySchema.extend({
  id: z.string().min(1, "Category ID is required"),
});

//   name        String
//   slug        String   @unique
//   category    String
//   images      String[]
//   description String
//   link_url    String

export const insertProjectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string()).min(1, "Proroct must have at least one image"),
  link_url: z.string().min(3, "Link must be at least 3 characters"),
  isFeatured: z.boolean(),
});

export const updateProjectSchema = insertProjectSchema.extend({
  id: z.string().min(1, "Project ID is required"),
});

export const projectDefaultValues = {
  name: "",
  slug: "",
  category: "",
  description: "",
  images: [],
  link_url: "",
  isFeatured: false,
};
// Shema for signing user in
export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Shema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
});

// Schema to update Users
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, "User ID is required"),
  role: z.string().min(1, "Role is required"),
});
