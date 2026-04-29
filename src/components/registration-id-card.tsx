"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./max-width-wrapper";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type Props = {
  showCardId: {
    status: boolean;
    cardId: string;
  };
  setCopied: Dispatch<SetStateAction<boolean>>;
  copied: boolean;
  setShowCardId: Dispatch<
    SetStateAction<{
      status: boolean;
      cardId: string;
    }>
  >;
};
const RegistrationIdCard = ({
  showCardId,
  setCopied,
  copied,
  setShowCardId,
}: Props) => {
  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => setCopied(true), 500);
    } catch (error) {
      console.error(error);
    }
  }

  const router = useRouter();
  return (
    <MaxWidthWrapper>
      <div className="flex-col-center space-y-6 h-screen">
        <p className="text-center p-text">
          Thank you for completing this form, <br /> Kindly copy and save your
          ID.
        </p>
        <div className="border shadow w-full sm:w-xl h-24 flex-center bg-white rounded-md">
          <div className="inline-flex space-x-4 items-center ">
            <p className="text-2xl italic font-bold font-heebo">
              {showCardId.cardId}
            </p>
            <button onClick={async () => await copyText(showCardId.cardId)}>
              {!copied ? (
                <Copy className="hover:text-app-blue cursor-pointer" />
              ) : (
                <Check className="text-green-500" />
              )}
            </button>
          </div>
        </div>
        <div className="inline-flex space-x-6">
          <Button
            className="bg-app-blue cursor-pointer hover:bg-blue-800"
            onClick={() => {
              setShowCardId({ status: false, cardId: "" });
              router.replace("/registrations");
            }}
          >
            Done
          </Button>
          <Button
            className="cursor-pointer"
            variant={"ghost"}
            onClick={() => {
              setShowCardId({ status: false, cardId: "" });
              router.replace("/registrations");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default RegistrationIdCard;
