"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string().nonempty("UserName is required")
            .min(2, "User too short").max(16, "The userName must not exceed 16 characters"),
        email: zod_1.z.string().nonempty("Email is required")
            .email({ message: "Write a correct email" }),
        password: zod_1.z.string().nonempty("Password is required")
            .regex(/^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9 \S]{6,32}$/),
    })
});
exports.LoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Wrong email or password" }).optional(),
        userName: zod_1.z.string().min(2, "User too short").max(16, "The userName must not exceed 16 characters").optional(),
        password: zod_1.z.string().nonempty("Password is required").min(6, "Wrong email or password"),
    })
});
