"use server";

import { mail } from "@/env";
import { sendEmail } from "../mail/nodemailer";
import { handleErrors } from "../utils";
import { contactFormSchemaType } from "../validations";
import { contactTemplate } from "../mail/template";

export async function sendMail(data: contactFormSchemaType) {
  const { fullName, email, reason, phone, message } = data;

  const options = {
    from: email,
    to: mail.auth.user,
    subject: reason,
    text: `${fullName} with email: ${email} and phone ${phone}
    reached out from: ${data.state}, 
    for: ${reason} 
    with the following message: ${message}.
    `,
    html: contactTemplate(data),
  };
  try {
    await sendEmail(options);
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
