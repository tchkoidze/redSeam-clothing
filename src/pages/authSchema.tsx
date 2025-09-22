import { z } from "zod";

export const registrationSchema = z
  .object({
    userName: z.string().trim().min(3, "Usename must be at least 3 characters"),
    email: z.string().pipe(z.email("Invalid email format")),
    password: z.string().min(3, "Password must be at least 3 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
