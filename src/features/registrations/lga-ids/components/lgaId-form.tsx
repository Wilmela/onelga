"use client";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { FileText, Clock, Search } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  CustomInput,
  CustomTextarea,
  ImageUploadInput,
} from "@/components/customs";
import { lgaIdSchema, LgaIFormDataType } from "@/lib/validations";
import { toast } from "sonner";
import { LgaIdType } from "@/types";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

import { useState } from "react";
import Image from "next/image";
import { cloudinaryImageUrl } from "@/env";
import { createLgaIdCard, updateLgaIdCard } from "../actions/lgaId.actions";
import RegistrationIdCard from "@/components/registration-id-card";
import { Input } from "@/components/ui/input";

type FormType = {
  type: "Create" | "Update";
  lgaId?: LgaIdType;
};

const LgaIdForm = ({ type, lgaId }: FormType) => {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [showCardId, setShowCardId] = useState({ status: false, cardId: "" });
  const [copied, setCopied] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const initial = lgaId
    ? { ...lgaId }
    : {
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        placeOfBirth: "",
        homeTown: "",
        imageUrl: "",
      };

  const form = useForm<LgaIFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(lgaIdSchema),
  });

  const onSubmit = async (data: LgaIFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createLgaIdCard(data);

        if (res?.error) {
          toast.error(`Failed to create LGA card: ${res.error}`);
          return;
        }
        toast.success("LGA card has been created successfully!");
        if (res?.cardId) {
          setShowCardId({ status: true, cardId: res.cardId });
        }
      } else {
        // Run update function
        if (!lgaId) return;
        const id = lgaId._id as string;
        const res = await updateLgaIdCard(id, data);
        if (res?.error) {
          toast.error(`Failed to update blog post: ${res.error}`);
          return;
        }
        toast.success("lga card has been updated successfully!");
        router.replace("/dashboard/lgaids");
      }
    } catch (error) {
      console.error("card creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  function handleSearch(cardId: string) {
    if (cardId === "") return;

    setSearchValue(cardId);

    router.push(`/registrations/lga-id/${cardId}/view`);
  }
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
  return (
    <MaxWidthWrapper className="cols-span-1 md:col-span-4 flex flex-col justify-center size-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-y">
          <div className="mt-12 space-y-6 md:space-y-0 md:mt-0 md:flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {type === "Create" ? "NEW LGA ID CARD" : "UPDATE LGA ID CARD"}
            </h1>
            <div className="space-y-2">
              <p className="p-text font-bold">Already registered?</p>

              <div className="relative">
                <Input
                  placeholder="Enter card Id "
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
                      name="lastName"
                      control={form.control}
                      label="Last Name"
                      isRequired
                      placeholder="Enter last name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput
                    name="middleName"
                    control={form.control}
                    label="Middle Name"
                    placeholder="Enter middle name"
                  />
                </div>

                <div>
                  <ImageUploadInput
                    control={form.control}
                    setImageUrl={setImageUrl}
                    imageUrl={imageUrl}
                    isRequired
                    name="imageUrl"
                    label="Upload Image"
                  />
                  {lgaId && (
                    <div>
                      <p className="p-text">{lgaId.imageUrl}</p>
                      <Image
                        src={`${cloudinaryImageUrl}${lgaId.imageUrl}`}
                        alt="image"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
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
                      ? "Create LGA ID Letter"
                      : "Update LGA ID Letter"}
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

export default LgaIdForm;
