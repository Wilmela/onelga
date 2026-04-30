import LgaIdForm from "@/features/registrations/lga-ids/components/lgaId-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import BirthcertForm from "@/features/registrations/birth-certs/components/birthcert-form";
import { FORM_TYPES } from "@/lib/constants";
import { Suspense } from "react";

const RegistrationTypePage = async ({
  params,
}: {
  params: Promise<{ type: string }>;
}) => {
  return (
    <MaxWidthWrapper className="flex-center">
      <Suspense fallback={<p>loading...</p>}>
        <div className="w-full mx-auto max-w-4xl">
          <RenderForm params={params} />
        </div>
      </Suspense>
    </MaxWidthWrapper>
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
