import React, { Suspense } from "react";

const RegistrationTypePage = async ({
  params,
}: {
  params: Promise<{ type: string }>;
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <RenderForm params={params} />
    </Suspense>
  );
};

export default RegistrationTypePage;

async function RenderForm({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  return <div>{type}</div>;
}
