import { mail } from "@/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  secure: false,
  auth: {
    user: mail.auth.user,
    pass: mail.auth.pass,
  },
} as nodemailer.TransportOptions);

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail(
  mailOptions: MailOptions
): Promise<nodemailer.SentMessageInfo> {
  return await transporter.sendMail(mailOptions);
}
