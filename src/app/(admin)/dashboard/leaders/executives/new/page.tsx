import ExecutiveForm from "@/components/executive-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Create Executive ",
};
const NewExecutivePage = () => {
  return (
    <div>
      <ExecutiveForm type="Create" />
    </div>
  );
};

export default NewExecutivePage;
