import ProjectForm from "@/components/admin/project-form";
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

  if (!project) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Update Product</h1>
      <ProjectForm
        type="Update"
        project={{ ...project }}
        projectId={project.id}
      />
    </div>
  );
};

export default AdminProjectDetailPage;
