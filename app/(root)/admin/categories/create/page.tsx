import { Metadata } from "next";
import CategoryForm from "@/components/admin/category-form";

export const metadata: Metadata = {
  title: "Create Category",
};

const CreateCategoryPage = () => {
  return (
    <div className="flex flex-col w-full space-y-8">
      <h2 className="h2-bold">Create Categorie</h2>

      <CategoryForm type="Create" />
    </div>
  );
};

export default CreateCategoryPage;
