"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "ADMIN";
    UserRole["user"] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const UserSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('User', UserSchema);
