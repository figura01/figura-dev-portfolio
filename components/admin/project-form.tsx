"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { projectDefaultValues } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Project, Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject, updateProject } from "@/lib/actions/project.actions";
import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { insertProjectSchema, updateProjectSchema } from "@/lib/validators";

const ProjectForm = ({
  type,
  project,
  projectId,
  categories,
}: {
  type: "Create" | "Update";
  project?: Project;
  projectId?: string;
  categories: Category[];
}) => {
  const router = useRouter();

  const isUpdate = type === "Update";

  type FormValues = z.infer<typeof insertProjectSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(isUpdate ? updateProjectSchema : insertProjectSchema),
    defaultValues: (project && isUpdate
      ? (project as unknown as FormValues)
      : projectDefaultValues) as FormValues,
  });

  const onSubmit = async (values: FormValues) => {
    if (!isUpdate) {
      const res = await createProject(values);
      console.log("res: ", res);
      if (res.success) {
        toast.success("Product created");
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } else {
      if (!projectId) {
        router.push("/admin/projects");
        return;
      }
      const res = await updateProject({
        ...values,
        id: projectId,
      });
      if (res.success) {
        toast.success("Project updated");
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    }
  };

  const isFeatured = form.watch("isFeatured");
  const images = form.watch("images");

  console.log(isFeatured);
  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <div className="flex flex-col justify-start items-start md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProjectSchema>,
                "name"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProjectSchema>,
                "slug"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      size={"sm"}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProjectSchema>,
                "category"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                {/* <Input placeholder="Enter product name" {...field} /> */}
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem value={category.id} key={category.label}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProjectSchema>,
                "description"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="images"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProjectSchema>,
                "images"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent>
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="Product image"
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover object-center rounded-sm"
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          {...field}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue("images", [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full md:flex-row gap-5">
          {/* IsFeatured */}
          <div className="w-full">
            Featured Product ?
            <Card>
              <CardContent className="space-y-2 mt-2">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-full space-y-2 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="flex"
                        />
                      </FormControl>
                      <FormLabel>Is Featured</FormLabel>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="w-full">
            <FormField
              name="link_url"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="http://exemple.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="lg"
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
