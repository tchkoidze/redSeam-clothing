import z from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  surname: z.string().trim().min(3, "Surame must be at least 3 characters"),
  email: z
    .string()
    .min(3, "Email must be at least 3 characters long")
    .pipe(z.email("Invalid email format")),
  zip_code: z
    .string()
    .min(2, "The zip code field must be at least 2.")
    .regex(/^\d+$/, "The zip code field must be a number."),
  address: z
    .string()
    .min(3, "Address field is required, required at least 3 char"),
});

export type checkoutFormData = z.infer<typeof checkoutSchema>;
