"use server";

import { AnnouncementFormDataType, announceSchema } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleErrors, validateInput } from "../utils";
import { connectToDatabase } from "../database";

import Announcement from "../database/models/announcement.model";

export async function createAnnouncement(data: AnnouncementFormDataType) {
  try {
    const parsed = validateInput(announceSchema, data);
    await connectToDatabase();

    const existingPost = await Announcement.findOne({ title: parsed.title });

    if (existingPost) {
      throw new Error("A blog post with this title already exists");
    }

    const newAnnouncement = await Announcement.create({
      ...parsed,
    });

    if (newAnnouncement) {
      revalidatePath("/dashboard/announcements/view");
    }

    return { success: true };
  } catch (error) {
    console.error("News creation error:", error);
    return {
      error:
        handleErrors(error) || "Failed to create blog post. Please try again.",
    };
  }
}

export async function updateAnnouncement(
  id: string,
  data: AnnouncementFormDataType,
) {
  try {
    await connectToDatabase();

    const post = await Announcement.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: data.title,
          content: data.content,
          banner: data.date,
        },
      },
      { returnDocument: "after" },
    );

    if (post) {
      console.log(post);

      revalidateTag("announcements", "max");
    }

    return { success: true };
  } catch (error) {
    console.error("Blog update error:", error);
    return { error: handleErrors(error) || "Failed to update blog post" };
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await connectToDatabase();

    const news = await Announcement.findOneAndDelete({ _id: id });

    if (news) {
      revalidateTag("announcements", "max");
    }

    return { success: true };
  } catch (error) {
    console.error("Blog deletion error:", error);
    return { error: handleErrors(error) || "Failed to delete blog post" };
  }
}

export async function publishAnnouncement(id: string, isPublished: boolean) {
  try {
    await connectToDatabase();

    await Announcement.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isPublished,
        },
      },
    );
    revalidateTag("announcements", "max");
    revalidatePath("/dashboard/announcement/view");
    return { success: true };
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
export async function getAnnouncement() {
  try {
    await connectToDatabase();

    const announcement = await Announcement.find().sort({ date: -1 });
    if (!announcement) throw new Error("No announcement found");

    return JSON.parse(JSON.stringify(announcement));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
