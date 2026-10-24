import { z } from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.email({error: 'Invalid email address'}),
    displayName: requiredString('Display Name'),
    password: requiredString('Password')
});

export type RegisterSchema = z.input<typeof registerSchema>;