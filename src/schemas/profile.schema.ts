import { z } from "zod";

export const UpdateProfileSchema = z.object({
    body: z.object({
        username: z.string().nonempty("Username is required").min(4, "User too short").max(16, "The username must not exceed 16 characters").optional(),
        email: z.string().nonempty("Password is required").email({ message: "Write a correct email" }).optional(),
        password: z.string().nonempty("Password is required").min(6, "Password too short").max(32, "The password must not exceed 32 characters").optional(),
        description: z.string().optional(),
        last_name: z.string().optional(),
        profile_picture: z.string().optional(),
        first_name: z.string().nonempty().optional(),
        age: z.number().nonnegative().min(13).optional(),
        
    }),
})

export const ValidateProfileParamsSchema = z.object({
    params: z.object({
        id: z.string().nonempty().min(17),
    }),
})

export type UpdateProfileBodyType = z.infer<typeof UpdateProfileSchema>["body"]
export type ValidateProfileParamsType = z.infer<typeof ValidateProfileParamsSchema>["params"]