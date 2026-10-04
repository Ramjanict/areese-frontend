import { z } from "zod";

export const formSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .max(80, "Max 80 characters"),
  projectType: z
    .string()
    .min(1, "Project type is required")
    .max(30, "Max 30 characters"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
  resourceLink: z
    .string()
    .url("Enter a valid URL")
    .max(200, "Max 200 characters")
    .or(z.literal("")),
  shortNote: z.string().max(150, "Max 150 characters").optional(),
  keypoints: z
    .array(
      z.object({
        value: z.string().min(1, "Keypoint cannot be empty"),
      }),
    )
    .min(1, "At least one keypoint is required")
    .max(10, "Max 10 keypoints allowed"),
});
export type FormValues = z.infer<typeof formSchema>;
