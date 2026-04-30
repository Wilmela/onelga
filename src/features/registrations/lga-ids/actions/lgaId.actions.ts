"use server";

import { lgaIdSchema, LgaIFormDataType } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { genRandonID, handleErrors, validateInput } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
import LgaIdCard from "@/lib/database/models/lgaId.model";

export async function createLgaIdCard(data: LgaIFormDataType) {
  try {
    const parsed = validateInput(lgaIdSchema, data);

    await connectToDatabase();

    const isExist = await LgaIdCard.findOne({
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    });

    if (isExist) {
      throw new Error("An lga card already exists");
    }

    const card = await LgaIdCard.create({
      ...parsed,
      lgaCardId: genRandonID(10),
    });

    if (card) {
      revalidatePath("/dashboard/registrations/lgaids");

      return { cardId: card.lgaCardId };
    }
  } catch (error) {
    console.error("Letter creation error:", error);
    return {
      error:
        handleErrors(error) ||
        "Failed to create lga Id letter. Please try again.",
    };
  }
}

export async function updateLgaIdCard(id: string, data: LgaIFormDataType) {
  try {
    await connectToDatabase();

    const post = await LgaIdCard.findOneAndUpdate(
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

      revalidateTag("lgaId", "max");
      revalidatePath("/dashboard/registrations/lgaids");
    }

    return { success: true };
  } catch (error) {
    console.error("Card update error:", error);
    return { error: handleErrors(error) || "Failed to update card " };
  }
}

export async function getLgaIdCard(lgaCardId: string) {
  try {
    await connectToDatabase();
    const card = await LgaIdCard.findOne({ lgaCardId });
    if (!card) throw new Error("Birth card not found");

    return JSON.parse(JSON.stringify(card));
  } catch (error) {
    error: handleErrors(error);
  }
}
export async function deleteLgaIdCard(lgaCardId: string) {
  try {
    await connectToDatabase();

    const news = await LgaIdCard.findOneAndDelete({ lgaCardId });

    if (news) {
      revalidateTag("lgaId", "max");
      revalidatePath("/dashboard/registrations/lgaids");
    }

    return { success: true };
  } catch (error) {
    console.error("card deletion error:", error);
    return { error: handleErrors(error) || "Failed to delete card" };
  }
}

export async function processLgaIdCard(
  lgaCardId: string,
  isProcessed: boolean,
) {
  try {
    await connectToDatabase();

    await LgaIdCard.updateOne(
      { lgaCardId },
      {
        $set: {
          isProcessed,
        },
      },
    );
    revalidateTag("lgaId", "max");
    revalidatePath("/dashboard/registrations/lgaids");
    return { success: true };
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getLgaIdCards() {
  try {
    await connectToDatabase();

    const cert = await LgaIdCard.find().sort({ date: -1 });
    if (!cert) throw new Error("No cert found");

    return JSON.parse(JSON.stringify(cert));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
export async function getLgaIdCardById(lgaCardId: string) {
  try {
    await connectToDatabase();

    const card = await LgaIdCard.findOne({ lgaCardId });
    if (!card) throw new Error("No card found");

    return JSON.parse(JSON.stringify(card));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getProcessedLgaIdCard(lgaCardId: string) {
  try {
    await connectToDatabase();
    const card = await LgaIdCard.findOne({
      isProcessed: true,
      lgaCardId,
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
