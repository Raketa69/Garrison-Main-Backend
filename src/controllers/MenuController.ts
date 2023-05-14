import DishModel, { DishDoc } from '../models/Dish'
import { Request, Response } from 'express'
import { checkAdmin } from '../utils/chekAuthAdmin';
import { UserRole } from '../models/User';

export const create = async (req: Request, res: Response) => {
    try {

        checkAdmin(req.headers.role as UserRole, res);

        const doc = new DishModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            weight: req.body.weight,
            imageUrl: req.body.imageUrl,
        })

        const dish = await doc.save()

        res.json(dish)

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось создать блюдо"
        })
    }
}

export const update = async (req: Request, res: Response) => {
    try {

        checkAdmin(req.headers.role as UserRole, res);

        const dishId = req.params.id;

        (async (err, doc) => {
            await DishModel.findByIdAndUpdate(
                {
                    _id: dishId
                },
                {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    type: req.body.type,
                    weight: req.body.weight,
                    imageUrl: req.body.imageUrl,
                }
            );

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "err Не удалось ОБНОВИТЬ"
                })
            }

        })()


        res.json({
            success: true
        })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось ОБНОВИТЬ статью"
        })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {

        const dishId = req.params.id;

        (async (err, doc) => {
            await DishModel.findById(
                {
                    _id: dishId
                });

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "err Не удалось вернуть блюдо"
                })
            }

        })()

        const doc = await DishModel.findById(dishId)

        if (!doc) {
            return res.status(404).json({
                message: "блюдо не найдена"
            })
        }

        res.json(doc)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить блюдо"
        })
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const dishes = await DishModel.find().exec()

        res.json(dishes)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}

export const remove = async (req: Request, res: Response) => {
    try {

        checkAdmin(req.headers.role as UserRole, res);

        const dishId = req.params.id;

        (async (err, doc) => {
            await DishModel.findByIdAndDelete(
                {
                    _id: dishId
                });

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "err Не удалось удалить статью"
                })
            }

        })()


        res.json({
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить статью"
        })
    }
}