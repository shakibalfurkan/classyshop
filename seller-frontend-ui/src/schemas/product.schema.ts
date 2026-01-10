import z from "zod";

export const createProductSchema = z.object({
  title: z.string().nonempty("Title is required").trim(),
  description: z
    .string()
    .nonempty("Description is required")
    .max(150, { error: "Description cannot exceed 150 character" })
    .trim(),
  tags: z.string().nonempty("Tags is required").trim(),
  warranty: z.string().nonempty("Warranty is required").trim(),
  brand: z.string().trim().optional(),
  colors: z.array(z.string()).optional(),
});
