"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fiatSchema = new mongoose_1.Schema({
    entidad: {
        type: String, required: true, trim: true
    },
    CBU: {
        type: Number, required: false, trim: true, default: 0,
    },
    CVU: {
        type: Number, required: false, trim: true, default: 0,
    },
    alias: {
        type: String, required: true, trim: true, default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)('Fiat', fiatSchema);
