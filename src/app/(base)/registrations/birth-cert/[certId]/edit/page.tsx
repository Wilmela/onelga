import MaxWidthWrapper from "@/components/max-width-wrapper";
import BirthcertForm from "@/features/registrations/birth-certs/components/birthcert-form";
import { BirthcertType } from "@/types";
import { Suspense } from "react";
import { cachedBirthcerts } from "@/lib/DAL/cache";

type Props = {
  params: Promise<{ certId: string }>;
};

const EditBirthcert = async ({ params }: Props) => {
  return (
    <Suspense fallback={null}>
      <MaxWidthWrapper className="flex-center">
        <div className="w-full mx-auto max-w-4xl p-y">
          <RenderCert params={params} />
        </div>
      </MaxWidthWrapper>
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
