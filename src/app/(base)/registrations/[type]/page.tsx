import LgaIdForm from "@/features/registrations/lga-ids/components/lgaId-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import BirthcertForm from "@/features/registrations/birth-certs/components/birthcert-form";
import { FORM_TYPES } from "@/lib/constants";
import { Suspense } from "react";
import FormWrapper from "@/components/form-wrapper";

const RegistrationTypePage = async ({
  params,
}: {
  params: Promise<{ type: string }>;
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <FormWrapper>
        <RenderForm params={params} />
      </FormWrapper>
    </Suspense>
  );
};

export default RegistrationTypePage;

function switchForm(type: string) {
  switch (type) {
    case FORM_TYPES.birth:
      return <BirthcertForm type="Create" />;
    case FORM_TYPES.lgaId:
      return <LgaIdForm type="Create" />;
    default:
      return (
        <MaxWidthWrapper className="flex-center h-screen w-full">
          <p>No such form</p>
        </MaxWidthWrapper>
      );
  }
}
async function RenderForm({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  return <div className="p-y ">{switchForm(type)}</div>;
}
