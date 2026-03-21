"use server";

import { revalidatePath } from "next/cache";
import { mongoClientConnection } from "../mongo";
import { handleErrors } from "../utils";

export async function getUsers() {
  let client;
  try {
    const conn = await mongoClientConnection();
    const db = conn.db;
    client = conn.client;

    const users = (await db.collection("user").find().toArray()).map((u) => u);

    if (!users) throw Error("Users not found");
    
    const formattedUsers = users.map((u) => ({
      userId: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
    }));

    return JSON.parse(JSON.stringify(formattedUsers));
  } catch (error) {
    return { error: handleErrors(error) };
  } finally {
    if (client) await client.close();
  }
}

export async function updateUserRole(email: string, role: string) {
  let client;
  try {
    const conn = await mongoClientConnection();
    const db = conn.db;
    client = conn.client;

    const result = await db.collection("user").updateOne(
      { email },
      {
        $set: {
          role:
            role === "user" ? "creator" : role === "creator" ? "admin" : "user",
          updatedAt: new Date(),
        },
      },
    );

    if (result.modifiedCount > 0) {
      revalidatePath("/dashboard/users");
      return { success: true, message: `User role updated to ${role}` };
    } else {
      return { error: "User not found or role not changed" };
    }
  } catch (error) {
    return { error: handleErrors(error) };
  } finally {
    if (client) await client.close();
  }
}

export async function deleteUser(email: string) {
  try {
    const { db, client } = await mongoClientConnection();

    await db.collection("user").deleteOne({ email });

    revalidatePath("/dashboard/admin/users");
    await client.close();
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
