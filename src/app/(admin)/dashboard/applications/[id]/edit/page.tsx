import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getApplicationById } from "@/features/applications/actions/application.actions";
import ApplicationForm from "@/features/applications/components/application-form";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const EditApplicationPage = async ({ params }: Props) => {
  return (
    <MaxWidthWrapper className="p-y flex-center">
      <Suspense fallback={null}>
        <div className="w-full mx-auto max-w-4xl">
          <RenderApplyForm params={params} />
        </div>
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default EditApplicationPage;

const RenderApplyForm = async ({ params }: Props) => {
  const { id } = await params;

  const app = await getApplicationById(id);
  return (
    <div>
      <ApplicationForm type="Update" app={app} />
    </div>
  );
};
