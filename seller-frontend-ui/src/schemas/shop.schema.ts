import z from "zod";

export const createShopSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).trim(),
  bio: z
    .string()
    .nonempty("Bio is required")
    .min(20, { error: "Bio must be 20 characters long" })
    .max(100, {
      error: "Bio must be less than 100 characters",
    })
    .trim(),
  address: z.string().min(1, { message: "Address is required." }).trim(),
  openingHours: z
    .string()
    .min(1, { message: "Opening hours is required." })
    .trim(),
  website: z.url("Invalid website URL").trim().optional().or(z.literal("")),

  category: z.string().min(1, { message: "Category is required." }).trim(),
});
