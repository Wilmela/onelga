import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Suspense } from "react";
import { cachedLgaCards } from "@/lib/DAL/cache";
import LgaIdForm from "@/features/registrations/lga-ids/components/lgaId-form";
import { LgaIdType } from "@/types";

type Props = {
  params: Promise<{ cardId: string }>;
};

const EditLgaCard = async ({ params }: Props) => {
  return (
    <Suspense fallback={null}>
      <MaxWidthWrapper className="flex-center">
        <div className="w-full mx-auto max-w-4xl p-y">
          <RenderCard params={params} />
        </div>
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default EditLgaCard;

async function RenderCard({ params }: Props) {
  const { cardId } = await params;
  const res: LgaIdType[] = await cachedLgaCards();

  const card = res.find((r) => r.lgaCardId === cardId);

  return <LgaIdForm lgaId={card} type="Update" />;
}
