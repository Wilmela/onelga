import ContactForm from "@/components/contact-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { OTHER_CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

          {/* Image */}
          <div className="flex flex-col space-y-8 md:space-y-12 items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {OTHER_CONTACT.map((c) => (
                <div
                  key={c.title}
                  className="bg-white p-4 rounded-md shadow hover:shadow-2xl cursor-pointer group"
                >
                  <div className="flex items-center space-x-4 space-y-6">
                    <div
                      className={cn(
                        "rounded-full size-14 flex items-center justify-center",
                        c.bg,
                      )}
                    >
                      <c.Icon className="size-7 text-white group-hover:scale-105 transition-all" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl">{c.title}</h3>
                  </div>

                  <div>
                    <p className="p-text font-semibold">{c.description}</p>
                    <p className="p-text">{c.contact}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative size-40 ">
              <Image
                src={"/images/logo.png"}
                fill
                alt="logo"
                className="bg-white"
              />
            </div>

            <p>Expect to hear from us within 24 - 48 hours</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ContactPage;
