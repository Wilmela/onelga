"use server";

import { revalidateTag } from "next/cache";
import { connectToDatabase } from "../database";
import Project from "../database/models/project.model";
import { handleErrors, validateInput } from "../utils";
import { projectSchema, ProjectFormDataType } from "../validations";

export async function createProject(data: ProjectFormDataType) {
  try {
    const parsed = validateInput(projectSchema, data);
    await connectToDatabase();

    const project = await Project.create(parsed);

    if (!project) throw new Error("Failed to create Project");
    revalidateTag("projects", "max");

    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function updateProject(id: string, data: ProjectFormDataType) {
  try {
    const parsed = validateInput(projectSchema, data);

    await connectToDatabase();

    const project = await Project.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...parsed,
        },
      },
    );

    if (!project) throw new Error("Failed to update Project");
    revalidateTag("projects", "max");
    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function toggleProjectCompletion(title: string, status: boolean) {
  try {
    await connectToDatabase();

    const project = await Project.findOneAndUpdate(
      { title },
      {
        $set: {
          status: status,
        },
      },
    );

    if (!project) throw new Error("Failed to update project status");
    revalidateTag("projects", "max");

    return { success: true };
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function getProjects() {
  try {
    await connectToDatabase();

    const proj = await Project.find();

    if (!proj) throw new Error("Failed to find Project");

    return JSON.parse(JSON.stringify(proj));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function getProjectById(id: string) {
  try {
    await connectToDatabase();

    const exe = await Project.findById({ _id: id });

    if (!exe) throw new Error("Failed to find Project");

    return JSON.parse(JSON.stringify(exe));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function getProjectByName(name: string) {
  try {
    const decodedName = decodeURIComponent(name);

    if (!decodedName) throw new Error("No name provided");

    await connectToDatabase();

    const exe = await Project.findOne({ title: decodedName });

    if (!exe) throw new Error("Failed to find Project");

    return JSON.parse(JSON.stringify(exe));
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function deleteProject(title: string) {
  try {
    await connectToDatabase();

    const project = await Project.findOneAndDelete({ title });

    if (!project) throw new Error("Failed to delete Project");

    revalidateTag("projects", "max");
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
