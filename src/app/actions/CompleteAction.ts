"use server";

import { revalidateTag } from "next/cache";

export async function completeAction(
  id: number,
  is_completed: boolean,
  name: string
) {
  try {
    const response = await fetch(
      `https://wayi.league-funny.com/api/task/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_completed: !is_completed,
          updated_at: "2024-10-26T06:34:22.000Z",
        }),
      }
    );
    if (response.ok) {
      const updateTime = await fetch(
        `https://wayi.league-funny.com/api/task/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            updated_at: new Date().toISOString(),
          }),
        }
      );
      if (updateTime.ok) {
        const data = await updateTime.json();
        revalidateTag("get");
        return data;
      }
    } else {
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.log(error);
  }
}
