import CouncilorForm from "@/components/councilor-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Create Councilor",
};
const NewExecutivePage = () => {
  return (
    <div>
      <CouncilorForm type="Create" />
    </div>
  );
};

export default NewExecutivePage;
