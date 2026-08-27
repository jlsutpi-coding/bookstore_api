import z from "zod";

export const CreateLiteraryTalkSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(200, { message: "Title cannot exceed 200 words." }),

  description: z.string().optional().nullable(),

  youtubeUrl: z.url({
    protocol: /^https?$/,
    hostname: /^((www\.)?youtube\.com|youtu\.be)$/,
    error: "Must be a valid YouTube link starting with http or https.",
  }),

  eventDate: z.coerce.date({ message: "Invalid date format." }),
  location: z
    .string()
    .max(100, { message: "Location cannot exceed 100 words." })
    .optional()
    .nullable(),
  authorId: z
    .number({ message: "Author ID must be a number." })
    .int({ message: "Author ID must be an integer." })
    .positive({ message: "Author ID must be a positive integer." }),
});

export const UpdateLiteraryTalkSchema = CreateLiteraryTalkSchema.partial();
