import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(24)
}) 

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(24)
})