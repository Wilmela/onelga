import CouncilorForm from "@/components/councilor-form";
import { getCouncilorByName } from "@/lib/actions/councilor.actions";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Edit Councilor",
};
const EditCouncilorPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <RenderCouncilor params={params} />
    </Suspense>
  );
};

export default EditCouncilorPage;

async function RenderCouncilor({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;

  const councilor = await getCouncilorByName(name);
  return <CouncilorForm type="Update" councilor={councilor} />;
}
