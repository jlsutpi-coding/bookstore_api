import z from "zod";

export const CreateAuthorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Author name is required." })
    .max(100, { message: "Author name cannot exceed 100 characters." }),
  bio: z
    .string()
    .trim()
    .transform((val) => (val.length === 0 ? null : val))
    .optional()
    .nullable(),
});

export type CreateAuthorInput = z.infer<typeof CreateAuthorSchema>;
