'use client'
import { Lock, Eye, MapPin, Phone, FileText } from "lucide-react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { siteConfig } from "@/site-config";
import { Suspense } from "react";
import { LastUpdate } from "@/components/copy-date";

const PrivacyPolicy = () => {
  return (
    <section>
      <div className="bg-app-blue p-8 text-white text-center p-y">
        {/* <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" /> */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-12">
          Privacy Policy
        </h1>
        <p className="mt-2 text-green-100 font-medium">
          Ogba / Egbema / Ndoni Local Government Area (ONELGA)
        </p>
        <Suspense fallback={null}>
          <LastUpdate />
        </Suspense>
      </div>

      <MaxWidthWrapper className="overflow-hidden p-y ">
        <div className="p-8 md:p-12 space-y-10">
          <section>
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy describes how the{" "}
              <strong>Ogba/Egbema/Ndoni Local Government Area (ONELGA)</strong>{" "}
              Council collects, uses, and protects the personal information of
              residents, businesses, and visitors. As a government entity in
              Rivers State, Nigeria, we are committed to transparency and the
              protection of your data in accordance with the{" "}
              <strong>Nigeria Data Protection Act (NDPA)</strong> and the{" "}
              <strong>Nigeria Data Protection Regulation (NDPR)</strong>.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Policy Sections */}
          <div className="grid gap-10">
            {/* 1. Information We Collect */}
            <section className="flex gap-4">
              <div className="shrink-0">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <FileText size={24} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  1. Information We Collect
                </h2>
                <ul className="list-disc ml-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Personal Identifiers:</strong> Name, date of birth,
                    gender, and National Identification Number (NIN).
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Physical address
                    within ONELGA wards, email, and phone numbers.
                  </li>
                  <li>
                    <strong>Financial Information:</strong> Data related to
                    local taxes, tenement rates, and licensing fees.
                  </li>
                  <li>
                    <strong>Digital Data:</strong> IP addresses and browsing
                    behavior on our official portal.
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. How We Collect Data */}
            <section className="flex gap-4">
              <div className="shrink-0">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                  <Eye size={24} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  2. How We Collect Data
                </h2>
                <p className="text-gray-600 mb-2">
                  We collect data through various channels, including:
                </p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Physical Forms:</strong> Applications for
                    birth/death certificates and marriage registrations.
                  </li>
                  <li>
                    <strong>Digital Platforms:</strong> Online portals for tax
                    payments or grievance reporting.
                  </li>
                  <li>
                    <strong>Public Records:</strong> Information shared by state
                    or federal agencies for local planning.
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Purpose of Data Processing */}
            <section className="flex gap-4">
              <div className="shrink-0">
                <div className="p-3 bg-green-50 rounded-lg text-green-600">
                  <Lock size={24} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  3. Purpose of Data Processing
                </h2>
                <ul className="list-disc ml-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Service Delivery:</strong> Processing certificates
                    and permits.
                  </li>
                  <li>
                    <strong>Revenue Collection:</strong> Managing local
                    government rates and levies.
                  </li>
                  <li>
                    <strong>Community Safety:</strong> Enhancing security within
                    the local government area.
                  </li>
                  <li>
                    <strong>Communication:</strong> Sending updates on projects
                    and emergency alerts.
                  </li>
                </ul>
              </div>
            </section>

            {/* Rights & Security Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Rights & Data Security
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We implement physical and technical security measures to protect
                your information. Under the <strong>NDPR</strong>, you have the
                right to access, correct, or object to the processing of your
                data, subject to legal retention requirements.
              </p>
            </div>

            {/* Contact Section */}
            <section className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="text-green-600 shrink-0" size={20} />
                  <p className="text-sm text-gray-600">
                    ONELGA Council Secretariat, Omoku, Rivers State.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-green-600 shrink-0" size={20} />
                  <p className="text-sm text-gray-600">{siteConfig.phone}</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="bg-gray-50 border-t border-gray-100 p-6 text-center">
          <p className="text-xs text-gray-500 font-medium">
            Official Publication of the Ogba/Egbema/Ndoni Local Government
            Council
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PrivacyPolicy;
