"use server";

import { birthcartSchema, BirthcertFormDataType } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { genRandonID, handleErrors, validateInput } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
import Birthcert from "@/lib/database/models/birth-cert.model";

export async function getBirthcertByID(certId: string) {
  try {
    await connectToDatabase();
    const cert = await Birthcert.findOne({ certId });
    if (!cert) throw new Error("Birth cert not found");

    return JSON.parse(JSON.stringify(cert));
  } catch (error) {
    error: handleErrors(error);
  }
}
export async function createBirthcert(data: BirthcertFormDataType) {
  try {
    const parsed = validateInput(birthcartSchema, data);

    await connectToDatabase();

    const isExist = await Birthcert.findOne({
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    });

    if (isExist) {
      throw new Error("A birthcert already exists");
    }

    const cert = await Birthcert.create({
      ...parsed,
      certId: genRandonID(10),
    });

    if (cert) {
      revalidatePath("/dashboard/registrations/birthcerts");
      return { certId: cert.certId };
    }
  } catch (error) {
    console.error("News creation error:", error);
    return {
      error:
        handleErrors(error) || "Failed to create birthcert. Please try again.",
    };
  }
}

export async function updateBirthcert(id: string, data: BirthcertFormDataType) {
  try {
    await connectToDatabase();

    const post = await Birthcert.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { returnDocument: "after" },
    );

    if (post) {
      revalidateTag("birthcert", "max");
      revalidatePath("/dashboard/registrations/birthcerts");
    }

    return { success: true };
  } catch (error) {
    console.error("Blog update error:", error);
    return { error: handleErrors(error) || "Failed to update blog post" };
  }
}

export async function deleteBirthcert(certId: string) {
  try {
    await connectToDatabase();

    const news = await Birthcert.findOneAndDelete({ certId });

    if (news) {
      revalidateTag("birthcert", "max");
      revalidatePath("/dashboard/registrations/birthcerts");
    }

    return { success: true };
  } catch (error) {
    console.error("birth cert deletion error:", error);
    return { error: handleErrors(error) || "Failed to delete birthcert" };
  }
}

export async function processBirthcert(certId: string, isProcessed: boolean) {
  try {
    await connectToDatabase();

    await Birthcert.updateOne(
      { certId },
      {
        $set: {
          isProcessed,
        },
      },
    );
    revalidateTag("birthcert", "max");
    revalidatePath("/dashboard/registrations/birthcerts");
    return { success: true };
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getBirthcerts() {
  try {
    await connectToDatabase();

    const cert = await Birthcert.find().sort({ date: -1 });
    if (!cert) throw new Error("No cert found");

    return JSON.parse(JSON.stringify(cert));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getProcessedBirthcert(cardId: string) {
  try {
    await connectToDatabase();
    const card = await Birthcert.findOne({
      isProcessed: true,
      lgaCardId: cardId,
    });
    if (!card) throw new Error("No card found");

    return JSON.parse(JSON.stringify(card));
  } catch (error) {
    console.error("Error in card:", error);
    return {
      error: handleErrors(error),
    };
  }
}
