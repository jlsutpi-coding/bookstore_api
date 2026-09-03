import z from "zod";

export const CreateAuthorSchema = z
  .object({
    penName: z
      .string()
      .trim()
      .min(1, { message: "Author name is required." })
      .max(100, { message: "Author name cannot exceed 100 characters." })
      .optional(),
    realName: z.string().optional(),
    bio: z
      .string()
      .trim()
      .transform((val) => (val.length === 0 ? null : val))
      .optional()
      .nullable(),
    isAnonymous: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.isAnonymous && data.penName) {
      ctx.addIssue({
        code: "custom",
        message: "Pen name should not be provided when author is anonymous.",
        path: ["penName"],
      });
    }
    if (!data.isAnonymous && !data.penName) {
      ctx.addIssue({
        code: "custom",
        message: "Pen name is required when author is not anonymous.",
        path: ["penName "],
      });
    }
  });

export const UpdateAuthorSchema = z
  .object({
    penName: z
      .string()
      .trim()
      .min(1, { message: "Pen name cannot be empty." })
      .max(100, { message: "Pen name cannot exceed 100 characters." })
      .optional()
      .nullable(), // Allow explicit null to clear it (if changing to anonymous)
    realName: z.string().optional().nullable(),
    bio: z
      .string()
      .trim()
      .transform((val) => (val.length === 0 ? null : val))
      .optional()
      .nullable(),
    isAnonymous: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // 1. If they are explicitly setting isAnonymous to TRUE
    if (data.isAnonymous === true) {
      if (data.penName !== undefined && data.penName !== null) {
        ctx.addIssue({
          code: "custom",
          message: "Pen name should not be provided when author is anonymous.",
          path: ["penName"],
        });
      }
    }

    // 2. If they are explicitly setting isAnonymous to FALSE
    if (data.isAnonymous === false) {
      if (!data.penName) {
        ctx.addIssue({
          code: "custom",
          message: "Pen name is required when author is not anonymous.",
          path: ["penName"],
        });
      }
    }
  });
