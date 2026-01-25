import { z } from "zod";

export const contactSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	subject: z.string().min(1, "Subject is required"),
	message: z.string().min(1, "Message is required"),
	address: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
