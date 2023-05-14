"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReservSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    persons: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Reserv', ReservSchema);
