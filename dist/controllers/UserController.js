"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importStar(require("../models/User"));
const createToken = (id, role) => {
    return jsonwebtoken_1.default.sign({
        _id: id,
        role: role
    }, process.env.SECRET_JWT, {
        expiresIn: '30d'
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const doc = new User_1.default({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            phone: req.body.phone,
            role: User_1.UserRole.user
        });
        const user = yield doc.save();
        const token = createToken(user._id.toString(), user.role);
        const _a = user._doc, { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
        res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesagge: error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'User is undefind'
            });
        }
        const isValidPass = yield bcrypt_1.default.compare(req.body.password, user.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: 'Wrong email or password'
            });
        }
        const token = createToken(user._id.toString(), user.role);
        console.log(token);
        const _b = user._doc, { passwordHash } = _b, userData = __rest(_b, ["passwordHash"]);
        res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesagge: 'Не удалось авторизоваться'
        });
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.headers.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        const _c = user._doc, { passwordHash } = _c, userData = __rest(_c, ["passwordHash"]);
        res.json(userData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesagge: error.mesagge
        });
    }
});
exports.getMe = getMe;
