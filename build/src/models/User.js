"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: String,
    // firstName: String,
    // lastName: String,
    // description: String,
    profile_picture: String,
    publications: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Publication",
        },
        { timestamps: true, versionKey: false },
    ],
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('User', userSchema);
