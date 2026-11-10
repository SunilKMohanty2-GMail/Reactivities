import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.email({error: 'Invalid email address'}),
});

export type ForgotPasswordSchema = z.input<typeof forgotPasswordSchema>;