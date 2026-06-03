import BirthcertForm from "@/features/registrations/birth-certs/components/birthcert-form";
import { BirthcertType } from "@/types";
import { Suspense } from "react";
import { cachedBirthcerts } from "@/lib/DAL/cache";
import FormWrapper from "@/components/form-wrapper";

type Props = {
  params: Promise<{ certId: string }>;
};

const EditBirthcert = async ({ params }: Props) => {
  return (
    <Suspense fallback={null}>
      <FormWrapper>
        <RenderCert params={params} />
      </FormWrapper>
    </Suspense>
  );
};

export default EditBirthcert;

async function RenderCert({ params }: Props) {
  const { certId } = await params;
  const res: BirthcertType[] = await cachedBirthcerts();

  const cert = res.find((r) => r.certId === certId);

  return <BirthcertForm birthcert={cert} type="Update" />;
}
