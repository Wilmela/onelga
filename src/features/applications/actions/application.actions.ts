"use server";

import { ApplicationFormDataType, applicationSchema } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { genRandonID, handleErrors, validateInput } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
import LgaIdCard from "@/lib/database/models/lgaId.model";
import Application from "@/lib/database/models/application.model";

export async function createApplication(data: ApplicationFormDataType) {
  try {
    const parsed = validateInput(applicationSchema, data);

    await connectToDatabase();

    const isExist = await Application.findOne({
      position: parsed.position,
    });

    if (isExist) {
      throw new Error("An application already exists");
    }

    const card = await LgaIdCard.create({
      ...parsed,
      applicationId: genRandonID(10),
    });

    if (card) {
      revalidatePath("/dashboard/applications/");

      return { success: true };
    }
  } catch (error) {
    console.error("Application creation error:", error);
    return {
      error:
        handleErrors(error) ||
        "Failed to Application. Please try again.",
    };
  }
}

export async function updateApplication(
  id: string,
  data: ApplicationFormDataType,
) {
  try {
    await connectToDatabase();

    const post = await Application.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { returnDocument: "after" },
    );

    if (post) {
      console.log(post);

      revalidateTag("application", "max");
      revalidatePath("/dashboard/applications");
    }

    return { success: true };
  } catch (error) {
    console.error("Card update error:", error);
    return { error: handleErrors(error) || "Failed to update card " };
  }
}

export async function getApplication(applicationId: string) {
  try {
    await connectToDatabase();
    const app = await Application.findOne({ applicationId });
    if (!app) throw new Error("Application not found");

    return JSON.parse(JSON.stringify(app));
  } catch (error) {
    error: handleErrors(error);
  }
}
export async function deleteApplication(applicationId: string) {
  try {
    await connectToDatabase();

    const news = await Application.findOneAndDelete({ applicationId });

    if (news) {
      revalidateTag("application", "max");
      revalidatePath("/applications");
    }

    return { success: true };
  } catch (error) {
    console.error("application deletion error:", error);
    return { error: handleErrors(error) || "Failed to delete card" };
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

export async function getApplications() {
  try {
    await connectToDatabase();

    const cert = await Application.find().sort({ date: -1 });
    if (!cert) throw new Error("No application found");

    return JSON.parse(JSON.stringify(cert));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
export async function getApplicationById(applicationId: string) {
  try {
    await connectToDatabase();

    const card = await Application.findOne({ applicationId });
    if (!card) throw new Error("No application found");

    return JSON.parse(JSON.stringify(card));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getInvitedApplicants(applicationId: string) {
  try {
    await connectToDatabase();
    const app = await Application.findOne({
      isProcessed: true,
      applicationId,
    });
    if (!app) throw new Error("No app found");

    return JSON.parse(JSON.stringify(app));
  } catch (error) {
    console.error("Error in app:", error);
    return {
      error: handleErrors(error),
    };
  }
}
