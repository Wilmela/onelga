import ExecutiveForm from "@/components/executive-form";
import { getExecutiveByName } from "@/lib/actions/executive.actions";
import { Suspense } from "react";

const EditExecutivePage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <RenderExecutive params={params} />
    </Suspense>
  );
};

export default EditExecutivePage;

async function RenderExecutive({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;

  const executive = await getExecutiveByName(name);

  return <ExecutiveForm type="Update" executive={executive} />;
}
