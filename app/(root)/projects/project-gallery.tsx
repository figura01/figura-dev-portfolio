"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Category, Project } from "@/types";
import ProjectCard from "@/app/(root)/projects/project-card";

const ProjectsGallerie = ({
  projects,
  totalPages,
}: {
  projects: Project[];
  totalPages: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const projectsPerPage = 6;

  const categories: string[] = [
    "All",
    ...new Set(projects.map((p: Project) => p.category)),
  ];

  return (
    <div className="w-full flex flex-col items-start">
      {/* FILTERS */}
      <div className="flex flex-row gap-1 mb-4">
        {categories?.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page on category change
            }}
            className={`px-3 py-1 rounded text-sm transition cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((p, index) => (
          <div key={index}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGallerie;
