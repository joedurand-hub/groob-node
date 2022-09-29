"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateProfileParamsSchema = exports.UpdateProfileSchema = void 0;
const zod_1 = require("zod");
exports.UpdateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string().nonempty("UserName is required").min(4, "User too short").max(16, "The userName must not exceed 16 characters").optional(),
        email: zod_1.z.string().nonempty("Password is required").email({ message: "Write a correct email" }).optional(),
        password: zod_1.z.string().nonempty("Password is required").min(6, "Password too short").max(32, "The password must not exceed 32 characters").optional(),
        description: zod_1.z.string().max(230, "The description must not exceed 230 characters").optional(),
        firstName: zod_1.z.string().regex(/^[a-zA-ZÀ-ÿ\s]{2,16}$/).optional(),
        lastName: zod_1.z.string().regex(/^[a-zA-ZÀ-ÿ\s]{2,16}$/).optional(),
        followings: zod_1.z.string().optional(),
        followers: zod_1.z.string().optional(),
        explicitContent: zod_1.z.boolean().optional(),
        age: zod_1.z.number().nonnegative().min(13).optional(),
    }),
});
exports.ValidateProfileParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().nonempty().min(17),
    }),
});
