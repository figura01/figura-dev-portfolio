import ProjectForm from "@/components/admin/project-form";
import { getAllCategories } from "@/lib/actions/category.actions";
import { getProjectById } from "@/lib/actions/project.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update Project",
};

const AdminProjectDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  const project = await getProjectById(id);
  const { data: categories } = await getAllCategories();

  if (!project) return notFound();

  console.log("project: ", project);

  const projectObject = {
    id: project.id.toString(),
    name: project.name,
    category: project.category.label.toString(),
    slug: project.slug,
    link_url: project.link_url,
    images: project.images,
    isFeatured: project.isFeatured,
    description: project.description,
    createdAt: new Date(project.createdAt).toLocaleString(),
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Update Product</h1>
      <ProjectForm
        type="Update"
        project={projectObject}
        projectId={project.id}
        categories={categories}
      />
    </div>
  );
};

export default AdminProjectDetailPage;
