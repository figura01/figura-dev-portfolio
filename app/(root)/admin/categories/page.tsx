import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  getAllCategories,
  deleteCategory,
} from "@/lib/actions/category.actions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import DeleteDialog from "@/components/admin/delete-dialog";

const AdminCategoriesPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;
  const categories = await getAllCategories({
    page: Number(page),
    query: searchText || "",
  });

  return (
    <div className="flex flex-col w-full px-6 space-y-8">
      <div className="flex flex-between w-full items-center gap-3">
        <h1 className="h2-bold">Categories</h1>
        <Button asChild variant="default">
          <Link href="/admin/categories/create">Create Product</Link>
        </Button>
      </div>
      <div className="flex w-full">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>LABEL</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    {formatId(category.id as string)}
                  </TableCell>
                  <TableCell>{category.label}</TableCell>

                  <TableCell className="text-right">
                    <Button asChild variant={"outline"} size={"sm"}>
                      <Link href={`/admin/categories/${category.id}`}>
                        Edit
                      </Link>
                    </Button>
                    <DeleteDialog id={category.id} action={deleteCategory} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users.totalPages} />
        )} */}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
