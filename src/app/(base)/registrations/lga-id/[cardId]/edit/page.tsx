import { Suspense } from "react";
import { cachedLgaCards } from "@/lib/DAL/cache";
import LgaIdForm from "@/features/registrations/lga-ids/components/lgaId-form";
import { LgaIdType } from "@/types";
import FormWrapper from "@/components/form-wrapper";

type Props = {
  params: Promise<{ cardId: string }>;
};

const EditLgaCard = async ({ params }: Props) => {
  return (
    <Suspense fallback={null}>
      <FormWrapper>
        <RenderCard params={params} />
      </FormWrapper>
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
