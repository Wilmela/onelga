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
import { CouncilorFormDataType, councilorSchema } from "@/lib/validations";
import { toast } from "sonner";
import { CouncilorType } from "@/types";
import Image from "next/image";
import { cloudinaryImageUrl } from "@/env";
import { useRouter } from "next/navigation";
import {
  createCouncilor,
  updateCouncilor,
} from "@/lib/actions/councilor.actions";
import Spinner from "./spinner";

type FormType = {
  type: "Create" | "Update";
  councilor?: CouncilorType;
};

const CouncilorForm = ({ type, councilor }: FormType) => {
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const initial = councilor
    ? { ...councilor }
    : {
        name: "",
        position: "",
        bio: "",
        tenure: "",
        image: "",
        role: "",
      };

  const form = useForm<CouncilorFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(councilorSchema),
  });

  const onSubmit = async (data: CouncilorFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createCouncilor(data);
        if (res?.error) {
          toast.error(`Failed to create councilor: ${res.error}`);
          return;
        }
        toast.success("councior has been created successfully!");
        router.replace("/dashboard/leaders/councilor");
      } else {
        const id = councilor?._id as string;
        const res = await updateCouncilor(id, data);
        if (res?.error) {
          toast.error(`Failed to update blog post: ${res.error}`);
          return;
        }
        toast.success("Councilor has been updated successfully!");
        router.replace("/dashboard/leaders/councilors");
      }
    } catch (error) {
      console.error("Councilor creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className=" grid grid-cols-1 md:grid-cols-5">
        {/* LEFT */}
        <MaxWidthWrapper className="cols-span-1 md:col-span-3 flex flex-col justify-center size-full">
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
                          Basic Councilor Information
                        </FieldLegend>
                        <FieldDescription className="text-xs text-muted-foreground">
                          Core councilor details
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
                      {councilor && (
                        <div>
                          <p className="p-text">{councilor.image}</p>
                          <Image
                            src={`${cloudinaryImageUrl}${councilor.image}`}
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
                          ? "Create Councilor"
                          : "Update Councilor"}
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
            src={"/images/sec.jpeg"}
            alt="banner"
            className="object-cover"
            fill
          />
        </div>
      </section>
    </Suspense>
  );

};

export default CouncilorForm;
