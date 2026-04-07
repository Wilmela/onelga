import ContactForm from "@/components/contact-form";
import Contacts from "@/components/contacts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";

const ContactPage = () => {
  return (
    <section>
      <PageBanner />
      <MaxWidthWrapper className="p-y">
        <SectionHeader
          title="Contact Us"
          description="Do you have any concern?"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 ">
          <div className="px-6 border rounded-md">
            <ContactForm />
          </div>

          <Contacts />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ContactPage;
