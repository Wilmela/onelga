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
import { FileText } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  CustomInput,
  CustomRichTextArea,
  CustomSelect,
} from "@/components/customs";
import { AnnouncementFormDataType, announceSchema } from "@/lib/validations";
import { toast } from "sonner";
import { AnnouncementType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Spinner from "@/components/spinner";
import {
  createAnnouncement,
  updateAnnouncement,
} from "@/lib/actions/announcement.actions";
import { GENERAL_BG } from "@/lib/constants";

type FormType = {
  type: "Create" | "Update";
  announcement?: AnnouncementType;
};

const AnnouncementForm = ({ type, announcement }: FormType) => {
  const router = useRouter();

  const initial = announcement
    ? { ...announcement }
    : {
        title: "",
        content: "",
        type: "",
      };

  const TYPES = [
    { id: "job", value: "Job" },
    { id: "public", value: "Public" },
  ];
  
  const form = useForm<AnnouncementFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(announceSchema),
  });

  const onSubmit = async (data: AnnouncementFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createAnnouncement(data);
        if (res?.error) {
          toast.error(`Failed to announcement: ${res.error}`);
          return;
        }
        toast.success("Announcement has been created successfully!");
        router.replace("/dashboard/announcements/view");
      } else {
        // Run update function
        if (!announcement) return;
        const id = announcement._id as string;
        const res = await updateAnnouncement(id, data);
        if (res?.error) {
          toast.error(`Failed to update announcement: ${res.error}`);
          return;
        }
        toast.success("Announcement has been updated successfully!");
        router.replace("/dashboard/announcements/view");
      }
    } catch (error) {
      console.error("Announcement creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 h-screen">
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
                        Basic Information
                      </FieldLegend>
                      <FieldDescription className="text-xs text-muted-foreground">
                        Core announcement details
                      </FieldDescription>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <CustomInput
                      name="title"
                      control={form.control}
                      label="Announcenet Title"
                      isRequired
                      placeholder="Enter an engaging title for your blog post"
                    />
                    <CustomSelect
                      name="type"
                      control={form.control}
                      label="Announcenet Type"
                      isRequired
                      items={TYPES}
                    />

                    <div>
                      <CustomRichTextArea
                        name="content"
                        control={form.control}
                        label="Content"
                        isRequired
                      />
                    </div>
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
                        ? "Create Announcement"
                        : "Update Announcement"}
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
  );
};

export default AnnouncementForm;
