"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categoryFormDefaultValues } from "@/lib/constants";
import { insertCategorySchema, updateCategorySchema } from "@/lib/validators";
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";

import { createCategory, updateCategory } from "@/lib/actions/category.actions";

const CategoryForm = ({
  type,
  category,
  categoryId,
}: {
  type: "Create" | "Update";
  category?: Category;
  categoryId?: string;
}) => {
  const router = useRouter();

  const isUpdate = type === "Update";

  type FormValues = z.infer<typeof insertCategorySchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(
      isUpdate ? updateCategorySchema : insertCategorySchema
    ),
    defaultValues: (category && isUpdate
      ? { ...category }
      : categoryFormDefaultValues) as FormValues,
  });

  const onSubmit = async (values: FormValues) => {
    if (!isUpdate) {
      const res = await createCategory(values);
      if (res.success) {
        toast.success("Category created");
        router.push("/admin/categories");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } else {
      if (!categoryId) {
        router.push("/admin/categories");
        return;
      }
      const res = await updateCategory({
        ...values,
        id: categoryId,
      });
      if (res.success) {
        toast.success("Category updated");
        router.push("/admin/categories");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col justify-start items-start md:flex-row gap-5">
          {/* Label */}
          <FormField
            control={form.control}
            name="label"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertCategorySchema>,
                "label"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="lg"
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Category`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
