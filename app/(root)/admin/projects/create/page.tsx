// name        String
//   slug        String   @unique
//   category    String
//   images      String[]
//   description String
//   isFeatured  Boolean  @default(false)

import ProjectForm from "@/components/admin/project-form";
import { getSetCategories } from "@/lib/actions/category.actions";

const AdminProjectCreatePage = async () => {
  const { data } = await getSetCategories();
  console.log("data: ", data);

  return (
    <>
      <ProjectForm type="Create" categories={data} />
    </>
  );
};

export default AdminProjectCreatePage;
