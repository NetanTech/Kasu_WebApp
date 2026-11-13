import * as z from "zod";

const EMAIL_REQUIRED = "Email is required";
const EMAIL_INVALID = "Enter a valid email address";
const PASSWORD_REQUIRED = "Password is required";
const PASSWORD_INVALID = "Password does not meet requirements";
const CONFIRM_PASSWORD_REQUIRED = "Please confirm your password";
const PASSWORDS_DO_NOT_MATCH = "Passwords do not match";

export const PASSWORD_RULES = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    id: "symbol",
    label: "One symbol",
    test: (value: string) => /[^A-Za-z0-9\s]/.test(value),
  },
] as const;

export type PasswordRule = (typeof PASSWORD_RULES)[number];
export type PasswordRuleId = PasswordRule["id"];

export const getPasswordRuleStatus = (value: string) =>
  PASSWORD_RULES.map(({ id, label, test }) => ({
    id,
    label,
    met: test(value),
  }));

const emailSchema = z
  .string()
  .trim()
  .min(1, EMAIL_REQUIRED)
  .pipe(z.email(EMAIL_INVALID));

const passwordSchema = z.string().superRefine((value, ctx) => {
  if (!value) {
    ctx.addIssue(PASSWORD_REQUIRED);
    return;
  }

  if (PASSWORD_RULES.some((rule) => !rule.test(value))) {
    ctx.addIssue(PASSWORD_INVALID);
  }
});

const confirmPasswordSchema = z.string().min(1, CONFIRM_PASSWORD_REQUIRED);

const passwordsMatch = {
  error: PASSWORDS_DO_NOT_MATCH,
  path: ["confirmPassword"],
};

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(
    ({ password, confirmPassword }) =>
      !password || !confirmPassword || password === confirmPassword,
    passwordsMatch,
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, PASSWORD_REQUIRED),
});

export const forgotSchema = z.object({
  email: emailSchema,
});

export const resetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(
    ({ password, confirmPassword }) =>
      !password || !confirmPassword || password === confirmPassword,
    passwordsMatch,
  );

export type SignUpValues = z.infer<typeof signUpSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotValues = z.infer<typeof forgotSchema>;
export type ResetValues = z.infer<typeof resetSchema>;
