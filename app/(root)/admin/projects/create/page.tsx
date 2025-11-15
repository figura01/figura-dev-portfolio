import ProjectForm from "@/components/admin/project-form";
import { getSetCategories } from "@/lib/actions/category.actions";

const AdminProjectCreatePage = async () => {
  const { data: categories } = await getSetCategories();

  return (
    <>
      <ProjectForm type="Create" categories={categories || []} />
    </>
  );
};

export default AdminProjectCreatePage;
