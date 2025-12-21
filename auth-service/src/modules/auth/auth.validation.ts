import z from "zod";

const userRegistrationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(3, { error: "Name must be 3 characters long" })
      .trim(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
  }),
});
const userVerificationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(3, { error: "Name must be 3 characters long" })
      .trim(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less than 20 characters" })
      .trim(),
  }),
  otp: z.string({
    error: (issue) =>
      issue.input === undefined ? "OTP is required" : "OTP must be a string",
  }),
});

const userLoginSchema = z.object({
  body: z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less than 20 characters" })
      .trim(),
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
  }),
});

const resetUserPasswordSchema = z.object({
  body: z.object({
    newPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "New Password is required"
            : "New Password must be a string",
      })
      .trim(),
    token: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Token is required"
            : "Token must be a string",
      })
      .trim(),
  }),
});

const changeUserPasswordSchema = z.object({
  body: z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
    newPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "New Password is required"
            : "New Password must be a string",
      })
      .trim(),
  }),
});

// seller validation schemas
const sellerRegistrationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(3, { error: "Name must be 3 characters long" })
      .trim(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
  }),
});

const sellerVerificationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(3, { error: "Name must be 3 characters long" })
      .trim(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
    phoneNumber: z.e164({
      error: (issue) =>
        issue.input === undefined
          ? "Phone number is required"
          : "Invalid phone number",
    }),
    country: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "Country is required"
          : "Country must be a string",
    }),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less than 20 characters" })
      .trim(),
  }),
  otp: z.string({
    error: (issue) =>
      issue.input === undefined ? "OTP is required" : "OTP must be a string",
  }),
});

const createShopValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(2, { error: "Name must be 2 characters long" })
      .trim(),
  }),
  bio: z.string({
    error: (issue) =>
      issue.input === undefined ? "Bio is required" : "Bio must be a string",
  }),
  address: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Address is required"
        : "Address must be a string",
  }),
  openingHours: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Opening hours is required"
        : "Opening hours must be a string",
  }),
  website: z.string().optional(),
  category: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Category is required"
        : "Category must be a string",
  }),
  sellerId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Seller ID is required"
        : "Seller ID must be a string",
  }),
});

export const AuthValidation = {
  userRegistrationSchema,
  userVerificationSchema,
  userLoginSchema,
  forgotPasswordSchema,
  resetUserPasswordSchema,
  changeUserPasswordSchema,
  sellerRegistrationSchema,
  sellerVerificationSchema,
  createShopValidationSchema,
};
