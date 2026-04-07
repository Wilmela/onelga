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
import {
  CustomCheckbox,
  CustomInput,
  CustomTextarea,
  ImageUploadInput,
} from "./customs";
import { ProjectFormDataType, projectSchema } from "@/lib/validations";
import { toast } from "sonner";
import { ProjectType } from "@/types";
import Image from "next/image";
import { cloudinaryImageUrl } from "@/env";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import { createProject, updateProject } from "@/lib/actions/projects.actions";

type FormType = {
  type: "Create" | "Update";
  project?: ProjectType;
};

const ProjectForm = ({ type, project }: FormType) => {
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const initial = project
    ? { ...project }
    : {
        title: "",
        location: "",
        description: "",
        date: "",
        imageUrl: "",
        status: false,
      };

  const form = useForm<ProjectFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createProject(data);
        if (res?.error) {
          toast.error(`Failed to create blog post: ${res.error}`);
          return;
        }
        toast.success("Project has been created successfully!");
        router.replace("/dashboard/projects");
      } else {
        const id = project?._id as string;
        const res = await updateProject(id, data);
        if (res?.error) {
          toast.error(`Failed to update project: ${res.error}`);
          return;
        }
        toast.success("Project has been updated successfully!");
        router.replace("/dashboard/projects");
      }
    } catch (error) {
      console.error("Project creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="grid grid-cols-1 md:grid-cols-5">
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
                          Basic Project Information
                        </FieldLegend>
                        <FieldDescription className="text-xs text-muted-foreground">
                          Core project details
                        </FieldDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <CustomInput
                        name="title"
                        control={form.control}
                        label="Title"
                        isRequired
                        placeholder="Enter full name"
                      />

                      <CustomInput
                        name="location"
                        control={form.control}
                        label="Location"
                        isRequired
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <CustomTextarea
                        name="description"
                        control={form.control}
                        label="Description"
                        isRequired
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <CustomInput
                        name="date"
                        type="date"
                        control={form.control}
                        label="Date"
                        isRequired
                      />

                      <div className="inline-flex items-end space-x-4 w-8">
                        <CustomCheckbox
                          name="status"
                          control={form.control}
                          label="Status"
                        />
                        <p className="p-text text-xs">Completed</p>
                      </div>
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

                      {project && (
                        <div>
                          <p className="p-text">{project.imageUrl}</p>
                          <Image
                            src={`${cloudinaryImageUrl}${project.imageUrl}`}
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
                          ? "Create Project"
                          : "Update Project"}
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
            sizes="45vw"
          />
        </div>
      </section>
    </Suspense>
  );
};

export default ProjectForm;
