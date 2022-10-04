"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fiatSchema = new mongoose_1.Schema({
    Coin: {
        type: String, required: false, trim: true, default: "USDT",
    },
    Red: {
        type: String, required: false, trim: true, default: "Binance Smart Chain",
    },
    Address: {
        type: String, required: true, trim: true, default: "00xRTX3090dBZ07snk5CpUxRGBx00",
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
