import { body } from 'express-validator'


export const registerValidation = [

    body('email', 'Wrong email format').isEmail(),
    body('password', "Password must contains min 5 symbols").isLength({ min: 5 }),
    body('fullName', 'Enter name').isLength({ min: 3 }),
    body('phone', 'Wrong phone format').isMobilePhone('uk-UA')
]

export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', "Password must contains min 5 symbols").isLength({min: 5})
]

export const dishValidation = [
    body('name', 'Введите название').isLength({min: 5}).isString(),
    body('description', 'Введите состав').isLength({min: 3}).isString(),
    body('price', 'Введите цену').isNumeric(),
    body('type', 'Введите тип').isString(),
    body('weight', 'Неверный вес').isLength({min: 2}),
    body('imageUrl', 'Неверная ссылка на изображения').isString(),
]

export const reservValidation = [
    body('fullName', 'Введите название').isLength({min: 3}).isString(),
    body('phone', 'Wrong phone format').isMobilePhone('uk-UA'),
    body('persons', 'Введите количество людей').isNumeric(),
    body('date', 'Введите дату').isISO8601(),
    body('comment', 'Введите комментарий').isString()
]