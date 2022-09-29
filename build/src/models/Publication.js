"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const publicationSchema = new mongoose_1.Schema({
    content: {
        type: String, required: false, trim: true
    },
    images: [{
            public_id: String,
            secure_url: String,
            required: false,
        }],
    price: {
        type: Number, required: false, trim: true, default: 0,
    },
    likes: {
        type: Number, default: 0,
    },
    explicitContent: { type: Boolean, default: false },
    comments: {
        type: [String], default: [], maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    userName: { type: String },
    profilePicture: { type: String }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('Publication', publicationSchema);
