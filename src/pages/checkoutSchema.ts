import z from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  surname: z.string().trim().min(3, "Surame must be at least 3 characters"),
  email: z
    .string()
    .min(3, "Email must be at least 3 characters long")
    .pipe(z.email("Invalid email format")),
  zip_code: z.string().min(1, "Zip_code field is required"),
  address: z.string().min(1, "Address field is required"),
});

export type checkoutFormData = z.infer<typeof checkoutSchema>;
