import ProjectForm from "@/components/project-form";
import { getProjectById } from "@/lib/actions/projects.actions";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | News Edit" ,
};
const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RenderProject params={params} />
    </Suspense>
  );
};

export default EditProjectPage;

async function RenderProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const project = await getProjectById(id);

  return <ProjectForm type="Update" project={project} />;
}
