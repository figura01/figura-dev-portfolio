import { Project } from "@/types";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block transform transition duration-300 hover:scale-[1.02]"
    >
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md">
        <Image
          src={project.images[0]}
          alt={project.name}
          width={300}
          height={130}
          className="w-full h-40 object-cover"
        />
        <div className="p-5">
          <h3 className="text-3xl font-semibold text-blue-400 mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-gray-300 mb-2">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{project.category}</span>
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
