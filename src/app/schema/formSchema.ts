import { z } from "zod";

export const formSchema = z.object({
  missionName: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(10, { message: "任務名稱最多10個字" })
    .min(1, { message: "任務名稱最少一個字，不可空白" }),
  missionDescription: z.string().max(30, { message: "任務描述最多30個字" }),
  missionCompleted: z.boolean(),
});
