import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres"),
  email: z
    .string()
    .email("Ingresa un correo electrónico válido"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^[+]?[\d\s-]+$/, "Ingresa un número de teléfono válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Ingresa tu correo electrónico o teléfono"),
  password: z
    .string()
    .min(1, "Ingresa tu contraseña"),
});

export const recoveryRequestSchema = z.object({
  identifier: z
    .string()
    .min(1, "Ingresa tu correo electrónico o teléfono"),
});

export const recoveryVerifySchema = z.object({
  otp: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "Solo se permiten números"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type RecoveryRequestFormData = z.infer<typeof recoveryRequestSchema>;
export type RecoveryVerifyFormData = z.infer<typeof recoveryVerifySchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
