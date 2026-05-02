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
import { FileText, Clock } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  CustomInput,
  CustomTextarea,
  ImageUploadInput,
} from "@/components/customs";
import { ApplicationFormDataType, applicationSchema } from "@/lib/validations";
import { toast } from "sonner";
import { ApplicationType } from "@/types";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

import { useState } from "react";
import Image from "next/image";
import { cloudinaryImageUrl } from "@/env";
import {
  createApplication,
  updateApplication,
} from "../actions/application.actions";

type FormType = {
  type: "Create" | "Update";
  app?: ApplicationType;
};

const ApplicationForm = ({ type, app }: FormType) => {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");

  const initial = app
    ? { ...app }
    : {
        firstName: "",
        middleName: "",
        lastName: "",
        cv: "",
        qualification: "",
        position: "",
        passport: "",
      };

  const form = useForm<ApplicationFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createApplication(data);

        if (res?.error) {
          toast.error(`Failed to create application: ${res.error}`);
          return;
        }
        toast.success("Application card has been created successfully!");
      } else {
        // Run update function
        if (!app) return;
        const id = app._id as string;
        const res = await updateApplication(id, data);
        if (res?.error) {
          toast.error(`Failed to update application: ${res.error}`);
          return;
        }
        toast.success("Application has been updated successfully!");
        router.replace("/registrations/applications");
      }
    } catch (error) {
      console.error("application creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <MaxWidthWrapper className="cols-span-1 md:col-span-4 flex flex-col justify-center size-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-y">
          <div className="mt-12 space-y-6 md:space-y-0 md:mt-0 md:flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {type === "Create" ? " NEW APPLICATION" : "UPDATE APPLICATION"}
            </h1>
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
                    name="passport"
                    label="Upload Image"
                  />
                  {app && (
                    <div>
                      <p className="p-text">{app.passport}</p>
                      <Image
                        src={`${cloudinaryImageUrl}${app.passport}`}
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
                      Credentials Information
                    </FieldLegend>
                    <FieldDescription className="text-xs text-muted-foreground">
                      Position, CV and other details
                    </FieldDescription>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput
                    name="position"
                    control={form.control}
                    label="Enter position"
                    isRequired
                    placeholder="Enter place of birth"
                  />
                  <CustomInput
                    name="cv"
                    control={form.control}
                    label="CV"
                    isRequired
                    placeholder="Upload CV"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <CustomTextarea
                    name="qualification"
                    control={form.control}
                    label="Qualifications"
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
                      ? "SUBMIT APPLICATION"
                      : "Update APPLICATION"}
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

export default ApplicationForm;
