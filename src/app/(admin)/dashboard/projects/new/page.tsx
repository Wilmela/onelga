import ProjectForm from "@/components/project-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Projects",
};
const NewProjectPage = () => {
  return <ProjectForm type="Create" />;
};

export default NewProjectPage;
