import MaxWidthWrapper from "@/components/max-width-wrapper";
import ApplicationForm from "@/features/applications/components/application-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ position: string; description: string }>;
};
const ApplyPage = async ({ searchParams }: Props) => {
  return (
    <MaxWidthWrapper className="p-y flex-center">
      <Suspense fallback={null}>
        <div className="w-full mx-auto max-w-4xl">
          <RenderApplyForm searchParams={searchParams} />
        </div>
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ApplyPage;

const RenderApplyForm = async ({ searchParams }: Props) => {
  const { position, description } = await searchParams;

  if (!position || !description || description.length !== 6)
    redirect("/applications");

  return (
    <div>
      <ApplicationForm type="Create" />
    </div>
  );
};
