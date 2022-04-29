"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const publicationSchema = new mongoose_1.Schema({
    description: {
        type: String, required: true, trim: true
    },
    image: {
        type: String, required: false, trim: true
    },
    video: {
        type: String, required: false, trim: true
    },
    url: {
        type: String, required: false, trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Publication', publicationSchema);
