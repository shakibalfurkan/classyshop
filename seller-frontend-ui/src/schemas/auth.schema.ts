import z from "zod";

export const signupSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required." : "Invalid name.",
    })
    .trim(),

  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required." : "Invalid email.",
  }),
  phoneNumber: z
    .e164({
      error: (issue) =>
        issue.input === undefined
          ? "Phone number is required."
          : "Phone number is invalid.",
    })
    .min(10, { error: "Phone number must be 10 characters long" })
    .max(15, {
      error: "Phone number must be less than 15 characters",
    }),
  country: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Country is required." : "Invalid country.",
    })
    .trim(),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required."
          : "Invalid password.",
    })
    .min(8, { error: "Password must be 8 characters long" })
    .max(20, { error: "Password must be less than 20 characters" })
    .trim(),
});

export const loginSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required." : "Invalid email.",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required."
          : "Invalid password.",
    })
    .min(8, { error: "Password must be 8 characters long" })
    .max(20, { error: "Password must be less than 20 characters" }),
  rememberMe: z.boolean().optional(),
});
