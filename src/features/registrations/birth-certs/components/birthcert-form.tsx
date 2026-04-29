"use client";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn, formatDate } from "@/lib/utils";
import { FileText, User, Clock, Search } from "lucide-react";
import { Form } from "@/components/ui/form";
import { CustomInput, CustomTextarea } from "@/components/customs";
import { birthcartSchema, BirthcertFormDataType } from "@/lib/validations";
import { toast } from "sonner";
import { BirthcertType } from "@/types";
import { useRouter } from "next/navigation";
import {
  createBirthcert,
  updateBirthcert,
} from "@/features/registrations/birth-certs/actions/birth-cert.actions";
import { useState } from "react";
import RegistrationIdCard from "@/components/registration-id-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormType = {
  type: "Create" | "Update";
  birthcert?: BirthcertType;
};

const BirthcertForm = ({ type, birthcert }: FormType) => {
  const router = useRouter();

  const [showCardId, setShowCardId] = useState({ status: false, cardId: "" });
  const [copied, setCopied] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const initial = birthcert
    ? { ...birthcert, dob: formatDate(birthcert.dob) }
    : {
        firstName: "",
        middleName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        address: "",
        dob: "",
        placeOfBirth: "",
        homeTown: "",
      };

  const form = useForm<BirthcertFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(birthcartSchema),
  });

  const onSubmit = async (data: BirthcertFormDataType) => {
    if (!data) return;
    try {
      if (type === "Create") {
        const res = await createBirthcert(data);

        if (res?.error) {
          toast.error(`Failed to create birth cert post: ${res.error}`);
          return;
        }
        toast.success("birth cert has been created successfully!");
        if (res?.certId) {
          setShowCardId({ status: true, cardId: res.certId });
        }
      } else {
        // Run update function
        if (!birthcert) return;
        const id = birthcert._id as string;
        const res = await updateBirthcert(id, data);
        if (res?.error) {
          toast.error(`Failed to update blog post: ${res.error}`);
          return;
        }
        toast.success("birth cert has been updated successfully!");
        router.replace(`/registrations/birth-cert/${birthcert.certId}/view`);
      }
    } catch (error) {
      console.error("Birthcert creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // zPGNpjgDpQ;
  if (showCardId.cardId !== "") {
    return (
      <RegistrationIdCard
        copied={copied}
        setCopied={setCopied}
        setShowCardId={setShowCardId}
        showCardId={showCardId}
      />
    );
  }

  function handleSearch(certId: string) {
    if (certId === "") return;

    setSearchValue(certId);

    router.push(`/registrations/birth-cert/${certId}/view`);
  }
  return (
    <MaxWidthWrapper className="cols-span-1 md:col-span-4 flex flex-col justify-center size-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-y">
          <div className="mt-12 space-y-6 md:space-y-0 md:mt-0 md:flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {type === "Create"
                ? "NEW BIRTH CERTIFICATE"
                : "UPDATE BIRTH CERTIFICATE"}
            </h1>

            <div className="space-y-2">
              <p className="p-text font-bold">Already registered?</p>

              <div className="relative">
                <Input
                  placeholder="Enter cert Id "
                  className="pr-12"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search
                  className="absolute top-2 right-4 cursor-pointer hover:text-app-blue"
                  onClick={() => handleSearch(searchValue)}
                />
              </div>
            </div>
          </div>
          <FieldGroup>
            <FieldSet>
              {/* Basic Information */}
              <FieldGroup className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="size-6 text-blue-600" />
                  <div>
                    <FieldLegend className="font-bold text-accent-foreground">
                      Personal Information
                    </FieldLegend>
                    <FieldDescription className="text-xs text-muted-foreground">
                      Individual&apos;s personal details
                    </FieldDescription>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput
                    name="firstName"
                    control={form.control}
                    label="First Name"
                    isRequired
                    placeholder="Enter first name"
                  />
                  <CustomInput
                    name="middleName"
                    control={form.control}
                    label="Middle Name"
                    placeholder="Enter middle name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput
                    name="lastName"
                    control={form.control}
                    label="Last Name"
                    isRequired
                    placeholder="Enter last name"
                  />
                  <CustomInput
                    name="dob"
                    control={form.control}
                    label="Date of Birth"
                    isRequired
                    type="date"
                    placeholder="Enter date of birth"
                  />
                </div>
              </FieldGroup>

              {/* Parent Information */}
              <FieldGroup className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="size-6 text-green-600" />
                  <div>
                    <FieldLegend className="font-bold text-accent-foreground">
                      Parent Information
                    </FieldLegend>
                    <FieldDescription className="text-xs text-muted-foreground">
                      Parents&apos; details
                    </FieldDescription>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput
                    name="fatherName"
                    control={form.control}
                    label="Father's Name"
                    isRequired
                    placeholder="Enter father's name"
                  />
                  <CustomInput
                    name="motherName"
                    control={form.control}
                    label="Mother's Name"
                    isRequired
                    placeholder="Enter mother's name"
                  />
                </div>
              </FieldGroup>

              {/* Birth Information */}
              <FieldGroup className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="size-6 text-purple-600" />
                  <div>
                    <FieldLegend className="font-bold text-accent-foreground">
                      Birth Information
                    </FieldLegend>
                    <FieldDescription className="text-xs text-muted-foreground">
                      Birth location and other details
                    </FieldDescription>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput
                    name="placeOfBirth"
                    control={form.control}
                    label="Place of Birth"
                    isRequired
                    placeholder="Enter place of birth"
                  />
                  <CustomInput
                    name="homeTown"
                    control={form.control}
                    label="Hometown"
                    isRequired
                    placeholder="Enter hometown"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <CustomTextarea
                    name="address"
                    control={form.control}
                    label="Residential Address"
                    isRequired
                    rows={3}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={cn(
                "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold",
                "py-6 rounded-xl text-lg transition-all duration-300",
                "hover:scale-105 hover:shadow-lg",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer",
              )}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Spinner />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>
                    {type === "Create"
                      ? "Create Birth Certificate"
                      : "Update Birth Certificate"}
                  </span>
                </div>
              )}
            </Button>
          </FieldGroup>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default BirthcertForm;
