"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrDeletePublicationByIdSchema = exports.CreatePublicationSchema = void 0;
const zod_1 = require("zod");
exports.CreatePublicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().max(500).optional(),
        price: zod_1.z.any(),
        explicitContent: zod_1.z.any().optional()
    }),
    // params: z.object({
    //     id: z.string().min(17)
    // })
});
exports.GetOrDeletePublicationByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().nonempty().min(17),
    }),
});
