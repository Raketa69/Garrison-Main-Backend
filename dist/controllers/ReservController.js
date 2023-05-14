"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getAll = exports.getOne = exports.update = exports.create = void 0;
const Reserv_1 = __importDefault(require("../models/Reserv"));
const chekAuthAdmin_1 = require("../utils/chekAuthAdmin");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = new Reserv_1.default({
            fullName: req.body.fullName,
            phone: req.body.phone,
            persons: req.body.persons,
            date: req.body.date,
            comment: req.body.comment
        });
        const reserv = yield doc.save();
        res.json(reserv);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать резерв"
        });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservId = req.params.id;
        (0, chekAuthAdmin_1.checkAdmin)(req.headers.role, res);
        ((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
            yield Reserv_1.default.findByIdAndUpdate({
                _id: reservId
            }, {
                fullName: req.body.fullName,
                phone: req.body.phone,
                persons: req.body.persons,
                date: req.body.date,
                comment: req.body.comment
            });
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "err Не удалось ОБНОВИТЬ"
                });
            }
        }))();
        res.json({
            success: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось ОБНОВИТЬ"
        });
    }
});
exports.update = update;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservId = req.params.id;
        ((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
            yield Reserv_1.default.findById({
                _id: reservId
            });
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "err Не удалось вернуть блюдо"
                });
            }
        }))();
        const doc = yield Reserv_1.default.findById(reservId);
        if (!doc) {
            return res.status(404).json({
                message: "блюдо не найдена"
            });
        }
        res.json(doc);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить блюдо"
        });
    }
});
exports.getOne = getOne;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, chekAuthAdmin_1.checkAdmin)(req.headers.role, res);
        const reservs = yield Reserv_1.default.find().exec();
        res.json(reservs);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить статьи"
        });
    }
});
exports.getAll = getAll;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, chekAuthAdmin_1.checkAdmin)(req.headers.role, res);
        const reservId = req.params.id;
        ((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
            yield Reserv_1.default.findByIdAndDelete({
                _id: reservId
            });
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "err Не удалось удалить статью"
                });
            }
        }))();
        res.json({
            success: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить статью"
        });
    }
});
exports.remove = remove;
