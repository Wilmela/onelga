"use server";

import {
  ApplicationPostingFormDataType,
  applicationPostingSchema,
} from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleErrors, validateInput } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
import Application from "@/lib/database/models/application.model";
import JobPosting from "@/lib/database/models/job-posting.model";
import mongoose from "mongoose";
import Announcement from "@/lib/database/models/announcement.model";

export async function createJobPosting(data: ApplicationPostingFormDataType) {
  
  await connectToDatabase();
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      const parsed = validateInput(applicationPostingSchema, data);

      const isExist = await JobPosting.findOne({
        position: parsed.position,
      }).session(session);

      if (isExist) {
        throw new Error("A job posting already exists");
      }

      const [job] = await JobPosting.create([parsed], {
        session,
      });

      const [announcement] = await Announcement.create(
        [
          {
            title: job.title,
            content: job.description,
            type: job.position,
          },
        ],
        { session },
      );

      return { job, announcement }; //return e.g {job, alert} when you add more create functions
    });

    if (result) {
      revalidatePath("/dashboard/applications/");

      return { success: true };
    }
  } catch (error) {
    console.error("Application creation error:", error);
    return {
      error: handleErrors(error) || "Failed to Application. Please try again.",
    };
  } finally {
    session.endSession();
  }
}

export async function updateJobPosting(
  id: string,
  data: ApplicationPostingFormDataType,
) {
  try {
    await connectToDatabase();

    const post = await JobPosting.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { returnDocument: "after" },
    );

    if (post) {
      revalidateTag("job-posting", "max");
      revalidatePath("/dashboard/applications");
    }

    return { success: true };
  } catch (error) {
    console.error("job posting error:", error);
    return { error: handleErrors(error) || "Failed to update posting " };
  }
}

export async function getJobPosting(title: string) {
  try {
    await connectToDatabase();
    const app = await JobPosting.findOne({ title });
    if (!app) throw new Error("Posting not found");

    return JSON.parse(JSON.stringify(app));
  } catch (error) {
    error: handleErrors(error);
  }
}

export async function deleteJobPosting(title: string) {
  try {
    await connectToDatabase();

    const news = await JobPosting.findOneAndDelete({ title });

    if (news) {
      revalidateTag("job-posting", "max");
      revalidatePath("/applications");
    }

    return { success: true };
  } catch (error) {
    console.error("posting deletion error:", error);
    return { error: handleErrors(error) || "Failed to delete posting" };
  }
}

export async function inviteApplication(
  applicationId: string,
  isProcessed: boolean,
) {
  try {
    await connectToDatabase();

    await Application.updateOne(
      { applicationId },
      {
        $set: {
          isProcessed,
        },
      },
    );
    revalidateTag("application", "max");
    revalidatePath("/applications");
    return { success: true };
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getJobPostings() {
  try {
    await connectToDatabase();

    const posting = await Application.find().sort({ date: -1 });
    if (!posting) throw new Error("No posting found");

    return JSON.parse(JSON.stringify(posting));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
