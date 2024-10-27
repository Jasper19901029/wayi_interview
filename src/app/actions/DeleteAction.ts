"use server";

import { revalidateTag } from "next/cache";

export async function deleteAction(id: number): Promise<void> {
  try {
    const response = await fetch(
      `https://wayi.league-funny.com/api/task/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      revalidateTag("get");
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.log(error);
  }
}
