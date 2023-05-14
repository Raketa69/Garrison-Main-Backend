"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const User_1 = require("../models/User");
const checkAdmin = (role, res) => {
    if (role != User_1.UserRole.admin) {
        return res.status(500).json({ message: "ERR Не удалось ОБНОВИТЬ" });
    }
};
exports.checkAdmin = checkAdmin;
