"use client";

import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, contactFormSchemaType } from "@/lib/validations";
import { CustomInput, CustomSelect, CustomTextarea } from "./customs";
import { Button } from "./ui/button";
import { STATES } from "@/lib/constants";
import Spinner from "./spinner";
import { Suspense } from "react";
import { sendMail } from "@/lib/actions/mail.actions";
import { toast } from "sonner";

const ContactForm = () => {
  const initial = {
    fullName: "",
    email: "",
    phone: "",
    state: "",
    reason: "",
    message: "",
    check: "",
  };
  const form = useForm<contactFormSchemaType>({
    defaultValues: initial,
    resolver: zodResolver(contactFormSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmitForm(data: contactFormSchemaType) {
    if (data.check !== "") return;
    try {
      const res = await sendMail(data);

      if (res?.error) {
        toast.error("Failed to send message");
        return;
      }

      toast.success("Message sent successfully");
      form.reset();
      return;
    } catch (error) {
      throw error;
    }
  }
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="py-6">
          <p className="text-xl font-semibold py-2 mb-4">
            Kindly complete this form
          </p>
          <CustomInput
            control={form.control}
            label="Full name"
            type="text"
            name="fullName"
            isRequired
          />
          <div className="hidden aria-hidden:">
            <CustomInput
              control={form.control}
              label="Check"
              type="text"
              name="check"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <CustomInput
              control={form.control}
              label="Email"
              type="email"
              name="email"
              isRequired
            />
            <CustomInput
              control={form.control}
              label="Phone"
              type="text"
              name="phone"
              isRequired
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              control={form.control}
              label="State"
              items={STATES}
              name="state"
              isRequired
            />
            <CustomInput
              control={form.control}
              label="Reason"
              type="text"
              name="reason"
              isRequired
            />
          </div>

          <div className="my-8">
            <CustomTextarea
              control={form.control}
              label="Message"
              name="message"
              isRequired
            />
          </div>

          <div>
            <Button
              disabled={isSubmitting}
              variant={"ghost"}
              className="bg-app-blue hover:bg-blue-800 text-white hover:text-white cursor-pointer rounded-full py-1 px-4"
            >
              {isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </Suspense>
  );
};

export default ContactForm;
