import z from "zod";

export const createShopSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required." : "Invalid name.",
    })
    .trim(),
  bio: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Bio is required." : "Invalid bio.",
    })
    .min(20, { error: "Bio must be 20 characters long" })
    .max(100, {
      error: "Bio must be less than 100 characters",
    })
    .trim(),
  address: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Address is required." : "Invalid address.",
    })
    .trim(),
  openingHours: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Opening hours is required."
          : "Invalid opening hours.",
    })
    .trim(),
  website: z.url("Invalid website URL").trim().optional(),

  category: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Category is required."
          : "Invalid category.",
    })
    .trim(),
});
