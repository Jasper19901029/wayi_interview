"use server";

import { revalidateTag } from "next/cache";

export const addAction = async (
  name: string,
  dataCompleted: boolean,
  description?: string
) => {
  try {
    const response = await fetch(`https://wayi.league-funny.com/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        is_completed: dataCompleted,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      revalidateTag("get");

      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
