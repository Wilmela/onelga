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
import { FileText, User, Clock, ImageIcon } from "lucide-react";
import { Form } from "./ui/form";
import {
  CustomInput,
  CustomRichTextArea,
  CustomSelect,
  CustomTextarea,
  ImageUploadInput,
} from "./customs";
import { BlogFormDataType, blogSchema } from "@/lib/validations";
import { toast } from "sonner";
import { createBlogPost, updateBlogPost } from "@/lib/actions/news.actions";
import { NewsType } from "@/types";
import Image from "next/image";
import { cloudinaryImageUrl, cloudName } from "@/env";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/site-config";
import { categories } from "@/lib/constants";
import Spinner from "./spinner";
import { CldUploadWidget } from "next-cloudinary";

type FormType = {
  type: "Create" | "Update";
  news?: NewsType;
};

const NewsForm = ({ type, news }: FormType) => {
  const [imageUrl, setImageUrl] = useState("");
  const [shots, setShots] = useState<string[]>([]);

  const router = useRouter();

  const initial = news
    ? { ...news }
    : {
        title: "",
        excerpt: "",
        content: "",
        banner: "",
        author: siteConfig.shortTitle,
        category: "General",
        readTime: "",
        slug: "",
      };

  const form = useForm<BlogFormDataType>({
    defaultValues: initial,
    resolver: zodResolver(blogSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSuccess(results: any) {
    const newUrl = results?.info?.secure_url;
    if (!newUrl) return;

    const existingLinks = news?.shots?.map((sn) => sn.link) || [];

    setShots((prevShots) => {
      const combined = [...prevShots, ...existingLinks, newUrl];

      return Array.from(new Set(combined));
    });
  }

  const onSubmit = async (data: BlogFormDataType) => {
    try {
      if (type === "Create") {
        const res = await createBlogPost(data, shots);
        if (res?.error) {
          toast.error(`Failed to create blog post: ${res.error}`);
          return;
        }
        toast.success("news post has been created successfully!");
        router.replace("/dashboard/news/view");
      } else {
        // Run update function
        if (!news) return;
        const id = news._id as string;
        const res = await updateBlogPost(id, data, shots);
        if (res?.error) {
          toast.error(`Failed to update blog post: ${res.error}`);
          return;
        }
        toast.success("Blog post has been updated successfully!");
        router.replace("/dashboard/news/view");
      }
    } catch (error) {
      console.error("Blog creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className=" grid grid-cols-1 md:grid-cols-6">
        {/* LEFT */}
        <MaxWidthWrapper className="cols-span-1 md:col-span-4 flex flex-col justify-center size-full">
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
                          Core news post details
                        </FieldDescription>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <CustomInput
                        name="title"
                        control={form.control}
                        label="Blog Title"
                        isRequired
                        placeholder="Enter an engaging title for your blog post"
                      />
                      {type === 'Update' &&<CustomInput
                        name="slug"
                        control={form.control}
                        label="Slug"
                        isRequired
                        placeholder="Enter slug"
                      />}

                      <CustomTextarea
                        name="excerpt"
                        control={form.control}
                        label="Excerpt"
                        isRequired
                        rows={2}
                      />

                      <div>
                        <CustomRichTextArea
                          name="content"
                          control={form.control}
                          label="Content"
                          isRequired
                        />
                      </div>

                      <ImageUploadInput
                        control={form.control}
                        setImageUrl={setImageUrl}
                        imageUrl={imageUrl}
                        isRequired
                        name="banner"
                        label="Upload cover image"
                      />
                      {news && (
                        <div>
                          <p className="p-text">{news.banner}</p>
                          <Image
                            src={
                              `${cloudinaryImageUrl}${news.banner}` ||
                              news.banner
                            }
                            alt="banner"
                            width={400}
                            height={200}
                          />
                        </div>
                      )}
                    </div>
                  </FieldGroup>
                </FieldSet>

                {/* Author & Category */}
                <FieldSet>
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <User className="size-6 text-blue-600" />
                      <div>
                        <FieldLegend className="font-bold text-accent-foreground">
                          Author & Category
                        </FieldLegend>
                        <FieldDescription className="text-xs text-muted-foreground">
                          Post classification and authorship
                        </FieldDescription>
                      </div>
                    </div>

                    <FieldGroup>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomInput
                          name="author"
                          control={form.control}
                          label="Author Name"
                          isRequired
                          placeholder="Enter author's full name"
                        />

                        <CustomSelect
                          name="category"
                          control={form.control}
                          isRequired
                          label="Category"
                          items={categories.map((i) => ({
                            id: i,
                            value: i,
                          }))}
                        />
                      </div>
                    </FieldGroup>
                  </div>
                </FieldSet>

                {/* Additional Information */}
                <FieldSet>
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Clock className="size-6 text-blue-600" />
                      <div>
                        <FieldLegend className="font-bold text-accent-foreground">
                          Additional Information
                        </FieldLegend>
                        <FieldDescription className="text-xs text-muted-foreground">
                          Optional post details
                        </FieldDescription>
                      </div>
                    </div>

                    <FieldGroup>
                      <div className="grid grid-cols-1 gap-6">
                        <CustomInput
                          name="readTime"
                          control={form.control}
                          label="Estimated Read Time"
                          placeholder="e.g., 5 min read"
                        />
                      </div>
                    </FieldGroup>
                  </div>
                </FieldSet>

                {/* Pictures */}
                <FieldSet>
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Clock className="size-6 text-blue-600" />
                      <div>
                        <FieldLegend className="font-bold text-accent-foreground">
                          Gallery
                        </FieldLegend>
                        <FieldDescription className="text-xs text-muted-foreground">
                          Other pictures
                        </FieldDescription>
                      </div>
                    </div>

                    <FieldGroup>
                      <div className="grid grid-cols-1 gap-6">
                        <CldUploadWidget
                          uploadPreset="onelga"
                          options={{
                            cloudName: cloudName,
                            multiple: true,
                            resourceType: "image",
                            maxFiles: 5,
                          }}
                          onSuccess={onSuccess}
                        >
                          {({ open }) => {
                            return (
                              <div className="w-full flex items-center justify-center">
                                {shots.length ? (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {shots.map((s) => (
                                      <Image
                                        key={s}
                                        src={s}
                                        width={100}
                                        height={100}
                                        alt="article pictures"
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <button type="button" onClick={() => open()}>
                                    <ImageIcon size={50} />
                                    Add Pictures
                                  </button>
                                )}
                              </div>
                            );
                          }}
                        </CldUploadWidget>

                        {news && type === "Update" && (
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-col-5 gap-4">
                            {news.shots.map((s) => (
                              <Image
                                key={s.id}
                                src={s.link}
                                width={110}
                                height={100}
                                alt="article pictures"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </FieldGroup>
                  </div>
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
                        {type === "Create" ? "Create News" : "Update News"}
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

export default NewsForm;
