import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(5, "must be more than 5 characters"),
  email: z.email().describe("provide a valid email"),
  phone: z.string().min(5, "must be more than 5 characters"),
  state: z.string().min(5, "must be more than 5 characters"),
  reason: z.string().min(5, "must be more than 5 characters"),
  message: z.string().min(5, "must be more than 5 characters"),
  check: z.string().optional(),
});

export type contactFormSchemaType = z.infer<typeof contactFormSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(5, "must be more than 5 characters"),
  email: z.email().describe("provide a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
});
export type signUpFormSchemaType = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.email().describe("provide a valid email"),
  password: z.string().min(5, "must be more than 5 characters"),
});
export type signInFormSchemaType = z.infer<typeof SignInSchema>;

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),

  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt must be less than 300 characters"),

  content: z
    .string()
    .min(1, "Content is required")
    .min(10, "Content must be at least 10 characters"),
  banner: z.string(),
  slug: z.string().optional(),

  author: z.string().describe("post author's name"),

  category: z
    .string()
    .min(1, "Category is required")
    .min(2, "Category must be at least 2 characters")
    .max(100, "Category must be less than 100 characters"),

  readTime: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^\d+\s*min(\s*read)?$/i.test(val), {
      message:
        "Please enter a valid read time format (e.g., '5 min read' or '10 min')",
    }),
});

export type BlogFormDataType = z.infer<typeof blogSchema>;

export const announceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  date: z.string().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .min(10, "Content must be at least 10 characters"),
  type: z
    .string()
    .min(1, "type is required")
    .min(3, "Content must be at least 3 characters"),
});

export type AnnouncementFormDataType = z.infer<typeof announceSchema>;

export const executiveSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 200 characters"),

  position: z
    .string()
    .min(1, "Position is required")
    .min(5, "Position must be at least 5 characters")
    .max(300, "Position must be less than 300 characters"),

  bio: z
    .string()
    .min(1, "Bio is required")
    .min(10, "Bio must be at least 10 characters"),
  tenure: z.string(),
  role: z.string(),
  image: z.string(),
});

export type ExecutiveFormDataType = z.infer<typeof executiveSchema>;

export const councilorSchema = z.object({
  name: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),

  position: z
    .string()
    .min(1, "Excerpt is required")
    .min(5, "Excerpt must be at least 5 characters")
    .max(300, "Excerpt must be less than 300 characters"),

  bio: z
    .string()
    .min(1, "Content is required")
    .min(10, "Content must be at least 10 characters"),
  ward: z.number(),
  tenure: z.string(),
  // role: z.string(),
  image: z.string(),
});

export type CouncilorFormDataType = z.infer<typeof councilorSchema>;

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),

  location: z
    .string()
    .min(1, "Location is required")
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt must be less than 300 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Content must be at least 10 characters"),
  date: z.string(),
  imageUrl: z.string(),
  status: z.boolean().optional(),
});

export type ProjectFormDataType = z.infer<typeof projectSchema>;

export const birthcartSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .min(1, "last name is required")
    .min(3, "last name must be at least 3 characters"),
  middleName: z.string().optional(),

  fatherName: z
    .string()
    .min(1, "father's name is required")
    .min(5, "father's name must be at least 5 characters"),

  motherName: z
    .string()
    .min(1, "mother's name is required")
    .min(5, "Title must be at least 5 characters"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Address must be at least 10 characters"),

  homeTown: z
    .string()
    .min(1, "home town is required")
    .min(2, "home town must be at least 2 characters"),

  placeOfBirth: z
    .string()
    .min(1, "place of birth is required")
    .min(5, "place of birth  must be at least 5 characters"),

  dob: z.string(),
  // imageUrl: z.string(),
  // status: z.boolean().optional(),
});

export type BirthcertFormDataType = z.infer<typeof birthcartSchema>;

export const lgaIdSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .min(1, "last name is required")
    .min(3, "last name must be at least 3 characters"),
  middleName: z.string().optional(),

  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Address must be at least 10 characters"),

  homeTown: z
    .string()
    .min(1, "home town is required")
    .min(2, "home town must be at least 2 characters"),

  placeOfBirth: z
    .string()
    .min(1, "place of birth is required")
    .min(5, "place of birth  must be at least 5 characters"),

  imageUrl: z.string(),
  // status: z.boolean().optional(),
});

export type LgaIFormDataType = z.infer<typeof lgaIdSchema>;

export const applicationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .min(1, "last name is required")
    .min(3, "last name must be at least 3 characters"),
  middleName: z.string().optional(),

  position: z
    .string()
    .min(1, "position is required")
    .min(10, "position must be at least 10 characters"),
  cv: z
    .string()
    .min(1, "cv is required")
    .min(10, "cv must be at least 10 characters"),

  qualification: z
    .string()
    .min(1, "qualification is required")
    .min(2, "qualification must be at least 2 characters"),

  passport: z.string(),
  // status: z.boolean().optional(),
});

export type ApplicationFormDataType = z.infer<typeof applicationSchema>;

export const applicationPostingSchema = z.object({
  title: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),

  description: z.string().min(5, "last name must be at least 3 characters"),

  position: z
    .string()
    .min(1, "position is required")
    .min(10, "position must be at least 10 characters"),
  requirements: z
    .string()
    .min(1, "requirements is required")
    .min(5, "requirements must be at least 5 characters"),
});

export type ApplicationPostingFormDataType = z.infer<
  typeof applicationPostingSchema
>;
