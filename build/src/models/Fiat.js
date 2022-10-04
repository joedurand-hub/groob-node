"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fiatSchema = new mongoose_1.Schema({
    entity: {
        type: String, required: true, trim: true, default: "Banco - Entidad"
    },
    CBU: {
        type: String, required: false, trim: true, default: "0000000000000000000000",
    },
    CVU: {
        type: String, required: false, trim: true, default: "0000000000000000000000",
    },
    alias: {
        type: String, required: true, trim: true, default: "gato.perro.loro",
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
