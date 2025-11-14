import DeleteDialog from "@/components/admin/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { deleteProject, getAllProjects } from "@/lib/actions/project.actions";
import { formatId } from "@/lib/utils";
import { connect } from "http2";
import Link from "next/link";

//   name        String
//   slug        String   @unique
//   category    String
//   images      String[]
//   description String
//   isFeatured  Boolean  @default(false)

const AdminProjectsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    project: string;
  }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;
  const projects = await getAllProjects({
    page: Number(page),
    query: searchText || "",
  });
  console.log("fetch projects: ", projects);
  return (
    <div className="flex flex-col w-full px-6 space-y-8">
      <div className="flex flex-between w-full items-center gap-3">
        <h1 className="h2-bold">Projects</h1>
        <Button asChild variant="default">
          <Link href="/admin/projects/create">Create Project</Link>
        </Button>
      </div>
      <div className="flex w-full">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>SLUG</TableHead>
                <TableHead>CATEGORY</TableHead>
                <TableHead>FEATURED</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    {formatId(project.id as string)}
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.slug}</TableCell>
                  <TableCell>{project.category.label}</TableCell>
                  <TableCell>
                    {project.isFeatured ? (
                      <Badge variant={"secondary"}>Yes</Badge>
                    ) : (
                      <Badge variant={"destructive"}>No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant={"outline"} size={"sm"}>
                      <Link href={`/admin/projects/${project.id}`}>Edit</Link>
                    </Button>
                    <DeleteDialog id={project.id} action={deleteProject} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
