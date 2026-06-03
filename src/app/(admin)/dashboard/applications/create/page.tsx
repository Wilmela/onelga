import FormWrapper from "@/components/form-wrapper";
import ApplicationPostingForm from "@/features/applications/components/application-posting-form";

const CreateApplicationPage = () => {
  return (
    <FormWrapper>
      <ApplicationPostingForm type="Create" />
    </FormWrapper>
  );
};

export default CreateApplicationPage;
