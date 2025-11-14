import { insertProjectSchema } from "@/lib/validators";
import { z } from "zod";

export type Category = {
  id: string;
  label: string;
};

export type Project = z.infer<typeof insertProjectSchema> & {
  id: string;
  category: string;
  createdAt: string;
};

export type HeroProps = {
  name?: string;
  text?: string;
};
