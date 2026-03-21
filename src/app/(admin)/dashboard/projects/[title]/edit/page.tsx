import ProjectForm from "@/components/project-form";
import { getProjectByName } from "@/lib/actions/projects.actions";
import { Suspense } from "react";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
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
  params: Promise<{ title: string }>;
}) {
  const title = (await params).title;

  const project = await getProjectByName(title);

  return <ProjectForm type="Update" project={project} />;
}
