import MaxWidthWrapper from "@/components/max-width-wrapper";

import {  LgaIdType } from "@/types";
import { Suspense } from "react";
import { getLgaIdCardById } from "@/features/registrations/lga-ids/actions/lgaId.actions";
import { LgaCard } from "@/features/registrations/lga-ids/components/lgacard";

type Props = {
  params: Promise<{ cardId: string }>;
};
const SingleLgaCardPage = ({ params }: Props) => {
  return (
    <MaxWidthWrapper className="p-y">
      <Suspense fallback={null}>
        <RenderLgaCard params={params} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default SingleLgaCardPage;

async function RenderLgaCard({ params }: Props) {
  const { cardId } = await params;
  const card: LgaIdType = await getLgaIdCardById(cardId);

  return <LgaCard card={card} />;
}
