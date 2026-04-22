import React from "react";

const RegistrationPage = async ({
  params,
}: {
  params: Promise<{ type: string }>;
}) => {
  const { type } = await params;
  return <div>RegistrationPage, {type}</div>;
};

export default RegistrationPage;
