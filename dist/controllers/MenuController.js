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
const Dish_1 = __importDefault(require("../models/Dish"));
const chekAuthAdmin_1 = require("../utils/chekAuthAdmin");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, chekAuthAdmin_1.checkAdmin)(req.headers.role, res);
        const doc = new Dish_1.default({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            weight: req.body.weight,
            imageUrl: req.body.imageUrl,
        });
        const dish = yield doc.save();
        res.json(dish);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать блюдо"
        });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, chekAuthAdmin_1.checkAdmin)(req.headers.role, res);
        const dishId = req.params.id;
        ((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
            yield Dish_1.default.findByIdAndUpdate({
                _id: dishId
            }, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                type: req.body.type,
                weight: req.body.weight,
                imageUrl: req.body.imageUrl,
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
            message: "Не удалось ОБНОВИТЬ статью"
        });
    }
});
exports.update = update;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishId = req.params.id;
        ((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
            yield Dish_1.default.findById({
                _id: dishId
            });
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "err Не удалось вернуть блюдо"
                });
            }
        }))();
        const doc = yield Dish_1.default.findById(dishId);
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
        const dishes = yield Dish_1.default.find().exec();
        res.json(dishes);
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
        const dishId = req.params.id;
        ((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
            yield Dish_1.default.findByIdAndDelete({
                _id: dishId
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
