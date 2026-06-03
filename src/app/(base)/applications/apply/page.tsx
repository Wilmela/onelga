import FormWrapper from "@/components/form-wrapper";
import ApplicationForm from "@/features/applications/components/application-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ position: string; description: string }>;
};
const ApplyPage = async ({ searchParams }: Props) => {
  return (
    <Suspense fallback={null}>
      <FormWrapper>
        <RenderApplyForm searchParams={searchParams} />
      </FormWrapper>
    </Suspense>
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
