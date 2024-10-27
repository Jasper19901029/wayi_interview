"use server";
import { formSchema } from "@/app/schema/formSchema";
import { revalidateTag } from "next/cache";

export const editAction = async (
  id: number,
  name: string,
  dataCompleted: boolean,
  description?: string
) => {
  const safeParse = formSchema.safeParse({
    missionName: name,
    missionDescription: description,
    missionCompleted: dataCompleted,
  });

  if (!safeParse.success) {
    return safeParse.error;
  }

  const response = await fetch(`https://wayi.league-funny.com/api/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      updated_at: new Date().toISOString(),
    }),
  });

  if (response.ok) {
    const data = await response.json();
    revalidateTag("get");

    return data;
  }
};
