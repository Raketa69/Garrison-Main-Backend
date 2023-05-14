"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservValidation = exports.dishValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email', 'Wrong email format').isEmail(),
    (0, express_validator_1.body)('password', "Password must contains min 5 symbols").isLength({ min: 5 }),
    (0, express_validator_1.body)('fullName', 'Enter name').isLength({ min: 3 }),
    (0, express_validator_1.body)('phone', 'Wrong phone format').isMobilePhone('uk-UA')
];
exports.loginValidation = [
    (0, express_validator_1.body)('email', 'Wrong email format').isEmail(),
    (0, express_validator_1.body)('password', "Password must contains min 5 symbols").isLength({ min: 5 })
];
exports.dishValidation = [
    (0, express_validator_1.body)('name', 'Введите название').isLength({ min: 5 }).isString(),
    (0, express_validator_1.body)('description', 'Введите состав').isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)('price', 'Введите цену').isNumeric(),
    (0, express_validator_1.body)('type', 'Введите тип').isString(),
    (0, express_validator_1.body)('weight', 'Неверный вес').isLength({ min: 2 }),
    (0, express_validator_1.body)('imageUrl', 'Неверная ссылка на изображения').isString(),
];
exports.reservValidation = [
    (0, express_validator_1.body)('fullName', 'Введите название').isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)('phone', 'Wrong phone format').isMobilePhone('uk-UA'),
    (0, express_validator_1.body)('persons', 'Введите количество людей').isNumeric(),
    (0, express_validator_1.body)('date', 'Введите дату').isISO8601(),
    (0, express_validator_1.body)('comment', 'Введите комментарий').isString()
];
