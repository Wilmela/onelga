"use server";

import { revalidateTag } from "next/cache";
import { connectToDatabase } from "../database";
import Executive from "../database/models/executive.model";
import { handleErrors, validateInput } from "../utils";
import { ExecutiveFormDataType, executiveSchema } from "../validations";

export async function createExecutive(data: ExecutiveFormDataType) {
  try {
 
    const parsed = validateInput(executiveSchema, data);

    await connectToDatabase();

    const exe = await Executive.create(parsed);

    if (!exe) throw new Error("Failed to create executive");

    revalidateTag("executives", "max");

    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function updateExecutive(id: string, data: ExecutiveFormDataType) {
  try {
    const parsed = validateInput(executiveSchema, data);

    await connectToDatabase();

    const exe = await Executive.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...parsed,
        },
      },
      { returnDocument: "after" },
    );

    if (!exe) throw new Error("Failed to update executive");
    revalidateTag("executives", "max");

    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function togglePastExecutive(name: string, isPast: boolean) {

  try {
    await connectToDatabase();

    const exe = await Executive.findOneAndUpdate(
      { name },
      {
        $set: {
          isPast,
        },
      },
    );

    if (!exe) throw new Error("Failed to update executive");

    revalidateTag("executives", "max");
    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function getExecutiveByName(name: string) {
  try {
    const decodedName = decodeURIComponent(name);

    if (!decodedName) throw new Error("No name provided");

    await connectToDatabase();

    const exe = await Executive.findOne({ name: decodedName });

    if (!exe) throw new Error("Failed to find executive");

    return JSON.parse(JSON.stringify(exe));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function getExecutives() {
  try {
    await connectToDatabase();

    const exe = await Executive.find();

    if (!exe) throw new Error("Failed to find executive");

    return JSON.parse(JSON.stringify(exe));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function deleteExecutive(name: string) {
  try {
    await connectToDatabase();

    const project = await Executive.findOneAndDelete({ name });

    if (!project) throw new Error("Failed to delete Project");

    revalidateTag("executives", "max");
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
