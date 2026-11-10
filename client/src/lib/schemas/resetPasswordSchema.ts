import { z } from "zod";
import { requiredString } from "../util/util";

export const resetPasswordSchema = z.object({
    newPassword: requiredString('New Password'),
    confirmPassword: requiredString('Confirm Password'),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "New Password & Confirm Password must match",
        path: ["confirmPassword"]
    });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;