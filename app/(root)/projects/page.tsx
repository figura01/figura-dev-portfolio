import { getAllProjects } from "@/lib/actions/project.actions";
import { Metadata } from "next";
import ProjectsGallerie from "./project-gallery";

export const metadata: Metadata = {
  title: "The LVDEV | Projects",
  description: "My website project portfolio",
};

// const prisma = new PrismaClient()

const ProjectsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;

  const dataProjects = await getAllProjects({
    page: Number(page),
    query: searchText || "",
  });

  console.log("dataProjects: ", dataProjects);

  const { data, totalPages } = dataProjects;

  const projects = data.map((p) => {
    console.log(p);
    return {
      id: p.id.toString(),
      name: p.name,
      category: p.category.label,
      slug: p.slug,
      link_url: p.link_url,
      images: p.images,
      isFeatured: p.isFeatured,
      description: p.description,
      createdAt: p.createdAt.toLocaleDateString(),
    };
  });

  return (
    <div className="wrapper">
      <h2 className="text-3xl font-bold text-gray-700 mb-8">🚀 My Projects</h2>

      <ProjectsGallerie projects={projects} totalPages={totalPages} />
    </div>
  );
};

export default ProjectsPage;
