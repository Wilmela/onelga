import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageBanner from "@/components/page-banner";
import SectionHeader from "@/components/section-header";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <section>
      <PageBanner />

      <MaxWidthWrapper className="p-y">
        
        <SectionHeader
          title="About ONELGA"
          description="Learn about ONELGA's geography, demographics, economic sectors, and cultural landmarks that shape this vital region of Rivers State."
        />

        <div className="relative size-24 flex justify-center w-full mb-4 ">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            fill
            className="z-0 object-contain"
            sizes="96px"
          />
        </div>
        <p className="p-text mx-auto max-w-[60ch] text-xl md:text-2xl text-justify z-10">
          Welcome to the official portal of Ogba/Egbema/Ndoni Local Government
          Area (ONELGA). Known as the energy powerhouse of Rivers State and a
          bastion of cultural heritage, ONELGA is a land of abundant resources,
          resilient people, and untapped potential.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <h1 className="about-h1">Our History & Creation</h1>
            <p className="about-p">
              Established in September 1991 from the former Ahoada Local
              Government Area, ONELGA was founded to bring governance closer to
              the people of the Ogba, Egbema, and Ndoni ethnic nationalities.
              From its headquarters in the thriving urban center of Omoku, the
              LGA has grown into one of Nigeria&apos;s most strategically
              important administrative divisions.
            </p>

            <h1 className="about-h1">Geography & Demographics</h1>

            <p className="about-p">
              Covering approximately 1,621 sq. km, ONELGA occupies a unique
              position in the northern part of Rivers State. We are a gateway to
              the Niger Delta, sharing borders with Imo, Delta, Bayelsa, and
              Anambra states.
            </p>

            <ul className="about-ul">
              <li className="about-li">
                Population: With an estimated 407,400 to 453,546 residents, our
                communities are vibrant and diverse.
              </li>

              <li className="about-li">
                Linguistic Heritage: The Ogba language is predominant, featuring
                the Egi, Igburu, and Usomini dialects.
              </li>
            </ul>

            <h1 className="about-h1">The Energy Hub of Nigeria</h1>
            <p className="about-p">
              ONELGA is globally recognized as the highest upstream oil and gas
              producing LGA in Rivers State. We host over 12 major mining fields
              and critical national infrastructure, including:
            </p>

            <ul className="about-ul">
              <li className="about-li">The Obiafu/Obrikom (Omoku) Gas Plant</li>
              <li className="about-li">The Obite Gas Plant</li>
              <li className="about-li">The Omoku Power Plant</li>
              <li className="about-li">
                Major Operators: We are proud partners to global energy giants
                such as Eni (Agip), TotalEnergies, and Shell (SPDC).
              </li>
            </ul>
          </div>

          {/* SECOND HALF */}
          <div>
            <h1 className="about-h1">Economic Vitality & Agriculture</h1>
            <p className="about-p">
              Beyond oil, ONELGA is an agricultural giant. Our vast, fertile
              land supports the large-scale cultivation of cassava, yam,
              plantain, and palm oil. Our proximity to the River Niger also
              sustains a thriving fishing industry and provides a direct trade
              route to the famous Onitsha World Market.
            </p>

            <h1 className="about-h1">Culture & Tradition</h1>
            <p className="about-p">
              Our identity is rooted in ancient traditions and revered
              institutions, led by the Oba of Ogbaland, the Nze-Obi of Egbema,
              the Awor of Ndoni, and the Eze Egi of Egi Kingdom. We celebrate
              our heritage through world-class festivals:
            </p>

            <ul className="about-ul">
              <li className="about-li">
                Nchaka Festival: A grand end-of-year celebration (late Nov/early
                Dec) featuring traditional dances and purification rites.
              </li>
              <li className="about-li">
                Egwu-Ogba (New Yam Festival): An annual August celebration of
                harvest and communal gratitude.
              </li>
              <li className="about-li">
                Okuroso Masquerade: A vibrant display of spirits and deities
                celebrated between January and February.
              </li>
            </ul>

            <h1 className="about-h1">Education & Progress</h1>
            <p className="about-p">
              ONELGA is a center for academic excellence, hosting the Federal
              College of Education (Technical), Omoku, which trains the next
              generation of technical leaders. Under the leadership of Hon.
              Shedrack Chukwu Ogbogu, the administration is committed to
              sustainable development, peace, and shared prosperity for all
              residents.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AboutPage;
