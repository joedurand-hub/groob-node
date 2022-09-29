"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chatId: {
        // type: Schema.Types.ObjectId,
        // ref: "Chat",
        type: String, required: false, trim: true
    },
    senderId: { type: String },
    remitterId: {
        type: String, required: false, trim: true
    },
    text: { type: String },
}, { timestamps: true, versionKey: false, });
exports.default = (0, mongoose_1.model)('Message', messageSchema);
