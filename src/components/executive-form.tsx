"use client";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "./max-width-wrapper";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { Form } from "./ui/form";
import { CustomInput, CustomTextarea, ImageUploadInput } from "./customs";
import { ExecutiveFormDataType, executiveSchema } from "@/lib/validations";
import { toast } from "sonner";
import { ExecutiveType } from "@/types";
import Image from "next/image";
import { cloudinaryImageUrl } from "@/env";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import {
  createExecutive,
  updateExecutive,
} from "@/lib/actions/executive.actions";
import { GENERAL_BG } from "@/lib/constants";

type FormType = {
  type: "Create" | "Update";
  executive?: ExecutiveType;
};

const ExecutiveForm = ({ type, executive }: FormType) => {
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const initial = executive
    ? { ...executive }
    : {
        name: "",
        position: "",
        bio: "",
        tenure: "",
        role: "",
        image: "",
      };

  const form = useForm<ExecutiveFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(executiveSchema),
  });

  const onSubmit = async (data: ExecutiveFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createExecutive(data);
        if (res?.error) {
          toast.error(`Failed to create executive: ${res.error}`);
          return;
        }
        toast.success("executive post has been created successfully!");
        router.replace("/dashboard/leaders/executives");
      } else {
        const id = executive?._id as string;
        const res = await updateExecutive(id, data);
        if (res?.error) {
          toast.error(`Failed to update executive: ${res.error}`);
          return;
        }
        toast.success("Executive has been updated successfully!");
        router.replace("/dashboard/leaders/executives");
      }
    } catch (error) {
      console.error("Executive creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="grid grid-cols-1 md:grid-cols-5">
        {/* LEFT */}
        <MaxWidthWrapper className="cols-span-1 md:col-span-3 flex flex-col justify-center lg:px-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-y"
            >
              <h1 className="text-2xl font-bold">
                {type === "Create" ? "NEW" : "UPDATE"}
              </h1>
              <FieldGroup>
                <FieldSet>
                  {/* Basic Information */}
                  <FieldGroup className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <FileText className="size-6 text-blue-600" />
                      <div>
                        <FieldLegend className="font-bold text-accent-foreground">
                          Executive&apos;s Basic Information
                        </FieldLegend>
                        <FieldDescription className="text-xs text-muted-foreground">
                          Core executive details
                        </FieldDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <CustomInput
                        name="name"
                        control={form.control}
                        label="Full Name"
                        isRequired
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CustomInput
                        name="position"
                        control={form.control}
                        label="Position"
                        isRequired
                      />
                      <CustomInput
                        name="role"
                        control={form.control}
                        label="Role"
                        isRequired
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <CustomTextarea
                        name="bio"
                        control={form.control}
                        label="A brief bio"
                        isRequired
                        rows={2}
                      />

                      <CustomInput
                        name="tenure"
                        control={form.control}
                        label="Tenure range"
                        isRequired
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <ImageUploadInput
                        control={form.control}
                        setImageUrl={setImageUrl}
                        imageUrl={imageUrl}
                        isRequired
                        name="image"
                        label="Upload Image"
                      />
                      {executive && (
                        <div>
                          <p className="p-text">{executive.image}</p>
                          <Image
                            src={`${cloudinaryImageUrl}${executive.image}`}
                            alt="image"
                            width={400}
                            height={200}
                          />
                        </div>
                      )}
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
                          ? "Create Executive"
                          : "Update Executive"}
                      </span>
                    </div>
                  )}
                </Button>
              </FieldGroup>
            </form>
          </Form>
        </MaxWidthWrapper>

        {/* RIGHT */}
        <div className="-z-10 relative hidden md:block md:col-span-2 border">
          <Image
            src={GENERAL_BG}
            alt="banner"
            className="object-cover"
            fill
            sizes="45vw"
          />
        </div>
      </section>
    </Suspense>
  );
};

export default ExecutiveForm;
