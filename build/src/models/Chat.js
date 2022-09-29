"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    members: {
        type: [String]
    },
    messages: [String],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('Chat', chatSchema);
