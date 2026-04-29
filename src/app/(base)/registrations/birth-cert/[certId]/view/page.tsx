import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Birthcert } from "@/features/registrations/birth-certs/components/birthcert";
import { getBirthcertByID } from "@/features/registrations/birth-certs/actions/birth-cert.actions";
import { BirthcertType } from "@/types";
import { Suspense } from "react";

type Props = {
  params: Promise<{ certId: string }>;
};
const SingleBirthcertPage = ({ params }: Props) => {
  return (
    <MaxWidthWrapper className="p-y">
      <Suspense fallback={null}>
        <RenderBirthcert params={params} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default SingleBirthcertPage;

async function RenderBirthcert({ params }: Props) {
  const { certId } = await params;
  const cert: BirthcertType = await getBirthcertByID(certId);

  return <Birthcert cert={cert} />;
}
