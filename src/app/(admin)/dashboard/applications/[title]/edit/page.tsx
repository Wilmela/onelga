import FormWrapper from "@/components/form-wrapper";
import { getJobPosting } from "@/features/applications/actions/job-posting-actions";
import ApplicationPostingForm from "@/features/applications/components/application-posting-form";
import { Suspense } from "react";

type Props = {
  params: Promise<{ title: string }>;
};
const EditApplicationPage = async ({ params }: Props) => {
  return (
    <Suspense fallback={null}>
      <FormWrapper className="p-y">
        <RenderPostingForm params={params} />
      </FormWrapper>
    </Suspense>
  );
};

export default EditApplicationPage;

const RenderPostingForm = async ({ params }: Props) => {
  const { title } = await params;

  const app = await getJobPosting(title);
  return (
    <div>
      <ApplicationPostingForm type="Create" job={app} />
    </div>
  );
};
