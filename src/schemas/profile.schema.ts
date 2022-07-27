import { z } from "zod";

export const UpdateProfileSchema = z.object({
    body: z.object({
        userName: z.string().nonempty("UserName is required").min(4, "User too short").max(16, "The userName must not exceed 16 characters").optional(),
        email: z.string().nonempty("Password is required").email({ message: "Write a correct email" }).optional(),
        password: z.string().nonempty("Password is required").min(6, "Password too short").max(32, "The password must not exceed 32 characters").optional(),
        description: z.string().max(230, "The description must not exceed 230 characters").optional(),
        first_name: z.string().regex(/^[a-zA-ZÀ-ÿ\s]{2,16}$/).optional(),
        last_name: z.string().regex(/^[a-zA-ZÀ-ÿ\s]{2,16}$/).optional(),
        profile_picture: z.string().optional(),
        followings: z.string().optional(),
        followers: z.string().optional(),
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