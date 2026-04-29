"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { BirthcertType } from "@/types";
import { Edit, Printer } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export function Birthcert({ cert }: { cert: BirthcertType }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: () => `Birth certificate-${cert.certId}`,
  });

  return (
    <div>
      <MaxWidthWrapper className="flex items-center justify-between mt-12">
        <div />
        {!cert.isProcessed ? (
          <div className="flex items-center space-x-4">
            <p className="p-text font-bold">Edit your information</p>
            <Link href={`/registrations/birth-cert/${cert.certId}/edit`}>
              <Edit className="size-8 hover:text-app-blue cursor-pointer" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <p className="p-text font-bold">Print</p>
            <Printer
              className="size-8 hover:text-app-blue cursor-pointer"
              onClick={reactToPrintFn}
            />
          </div>
        )}
      </MaxWidthWrapper>

      <div
        ref={contentRef}
        className="min-h-screen p-4 md:p-10 flex justify-center items-center font-serif"
      >
        <div className="relative max-w-4xl w-full bg-[#fdfcf0] shadow-2xl border-12 border-double border-amber-900 p-6 md:p-12 overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <span className="text-[10rem] font-bold">ONELGA</span>
          </div>

          {/* Header Section */}
          <header className="text-center mb-10 border-b-2 border-amber-900 pb-6">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-amber-900">
              Certificate of Birth
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 uppercase tracking-tighter">
              Official Registration of Vital Statistics
            </p>
            <div className="mt-4 text-xs font-mono text-slate-500">
              Certificate ID:{" "}
              <span className="font-bold text-slate-800">{cert.certId}</span>
            </div>
          </header>

          {/* Main Content Grid */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {/* Child's Name Section */}
            <div className="md:col-span-2 border-b border-amber-200 pb-4">
              <label className="block text-[10px] uppercase font-bold text-amber-800 mb-1">
                Full Name of Child
              </label>
              <div className="text-2xl md:text-3xl font-semibold text-slate-900 uppercase">
                {cert.firstName} {cert.middleName} {cert.lastName}
              </div>
            </div>

            {/* Birth Details */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-amber-800">
                Date of Birth
              </label>
              <div className="text-lg text-slate-800 border-b border-slate-300 pb-1">
                {new Date(cert.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-amber-800">
                Place of Birth
              </label>
              <div className="text-lg text-slate-800 border-b border-slate-300 pb-1">
                {cert.placeOfBirth}
              </div>
            </div>

            {/* Parent Details */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-amber-800">
                Father&apos;s Full Name
              </label>
              <div className="text-lg text-slate-800 border-b border-slate-300 pb-1">
                {cert.fatherName}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-amber-800">
                Mother&apos;s Full Name
              </label>
              <div className="text-lg text-slate-800 border-b border-slate-300 pb-1">
                {cert.motherName}
              </div>
            </div>

            {/* Origin Details */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-amber-800">
                Home Town
              </label>
              <div className="text-lg text-slate-800 border-b border-slate-300 pb-1">
                {cert.homeTown}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-amber-800">
                Current Address
              </label>
              <div className="text-lg text-slate-800 border-b border-slate-300 pb-1">
                {cert.address}
              </div>
            </div>
          </main>

          {/* Footer / Status Section */}
          <footer className="mt-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="text-center">
              <div className="w-48 border-b border-slate-900 mb-2"></div>
              <p className="text-[10px] uppercase font-bold text-slate-600">
                Registrar Signature
              </p>
            </div>

            <div className="flex flex-col items-center">
              {cert.isProcessed ? (
                <div className="border-4 border-green-700 text-green-700 px-4 py-1 font-bold rounded uppercase -rotate-12 opacity-70">
                  Verified & Processed
                </div>
              ) : (
                <div className="border-4 border-amber-600 text-amber-600 px-4 py-1 font-bold rounded uppercase -rotate-12 opacity-70">
                  Pending Verification
                </div>
              )}
              <p className="mt-4 text-[10px] text-slate-400 italic">
                This document is a certified electronic record.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
