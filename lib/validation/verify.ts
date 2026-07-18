import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, "کد تایید باید ۶ رقم باشد")
    .regex(/^\d+$/, "کد تایید نامعتبر است"),
});

export type VerifySchema = z.infer<
  typeof verifySchema
>;