import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/actions/category.actions";
import CategoryForm from "@/components/admin/category-form";

export const metadata: Metadata = {
  title: "Update Category",
};

const AdminDetailsCategoyPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const category = await getCategoryById(id);

  if (!category) notFound();
  console.log(category);

  return (
    <>
      <div className="flex flex-col w-full px-6 space-y-8">
        <h1 className="h2-bold">Edit Categorie</h1>
        <CategoryForm type="Update" category={category} categoryId={id} />
      </div>
    </>
  );
};

export default AdminDetailsCategoyPage;
