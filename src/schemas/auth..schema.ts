import { z } from "zod";


export const SignupSchema = z.object({
    body: z.object({
        username: z.string().nonempty("Username is required")
        .min(4, "User too short").max(16, "The username must not exceed 16 characters"),
        email: z.string().nonempty("Password is required")
        .email({ message: "Write a correct email" }),
        password: z.string().nonempty("Password is required")
        .regex(/^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9 \S]{6,32}$/),
    })
})


export const LoginSchema = z.object({
    body: z.object({
        email: z.string().nonempty("Password is required").email({ message: "Wrong email or password" }),
        password: z.string().nonempty("Password is required").min(6, "Wrong email or password"),
    })
})


export type SignupBodyType = z.infer<typeof SignupSchema>["body"]
export type LoginBodyType = z.infer<typeof LoginSchema>["body"]