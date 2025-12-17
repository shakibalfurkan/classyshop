import z from "zod";

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

export const signupSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required." : "Invalid name.",
    })
    .min(2, { error: "Name must be 2 characters long" })
    .trim(),

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
    .max(20, { error: "Password must be less than 20 characters" })
    .trim(),
});

export const forgotSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required." : "Invalid email.",
  }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "New password is required."
            : "Invalid new password.",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less than 20 characters" }),

    confirmNewPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Confirm new password is required."
            : "Invalid confirm new password.",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less than 20 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
