"use server";

import { revalidateTag } from "next/cache";
import { connectToDatabase } from "../database";
import Councilor from "../database/models/councilor.model";
import { handleErrors } from "../utils";
import { CouncilorFormDataType, councilorSchema } from "../validations";

export async function createCouncilor(data: CouncilorFormDataType) {
  console.log("calling");

  try {
    const parsed = councilorSchema.safeParse(data);

    if (!parsed.success) throw new Error(parsed.error.message);

    await connectToDatabase();

    const exe = await Councilor.create(parsed.data);

    if (!exe) throw new Error("Failed to create Councilor");

    revalidateTag("councilors", "max");
    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function updateCouncilor(id: string, data: CouncilorFormDataType) {
  try {
    const parsed = councilorSchema.safeParse(data);

    if (!parsed.success) throw new Error(parsed.error.message);

    await connectToDatabase();

    const exe = await Councilor.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
    );

    if (!exe) throw new Error("Failed to update Councilor");
    revalidateTag("councilors", "max");

    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function getCouncilorByName(name: string) {
  try {
    const decodedName = decodeURIComponent(name);

    if (!decodedName) throw new Error("No name provided");

    await connectToDatabase();

    const exe = await Councilor.findOne({ name: decodedName });

    if (!exe) throw new Error("Failed to find Councilor");

    return JSON.parse(JSON.stringify(exe));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function getCouncilors() {
  try {
    await connectToDatabase();

    const exe = await Councilor.find();

    if (!exe) throw new Error("Failed to find Councilor");

    return JSON.parse(JSON.stringify(exe));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function deleteCouncilor(name: string) {
  console.log("calling..");

  try {
    await connectToDatabase();

    const councilor = await Councilor.findOneAndDelete({ name });

    if (!councilor) throw new Error("Failed to delete councilor");

    revalidateTag("councilors", "max");
    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
