import z from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty("Name is required.").trim(),

  email: z.email().nonempty("Email is required.").trim(),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .min(10, { message: "Phone number must be at least 10 characters long." })
    .max(15, { message: "Phone number must be less than 15 characters." })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  country: z.string().min(1, { message: "Country is required." }).trim(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { error: "Password must be 8 characters long" })
    .max(20, { error: "Password must be less than 20 characters" })
    .trim(),
});

export const loginSchema = z.object({
  email: z.email().min(1, { message: "Email is required." }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { error: "Password must be 8 characters long" })
    .max(20, { error: "Password must be less than 20 characters" })
    .trim(),
  rememberMe: z.boolean().optional(),
});
