import ReservModel, { ReservDoc } from '../models/Reserv'
import { Request, Response } from 'express'
import jwt from "jsonwebtoken";
import { UserRole } from '../models/User';
import { checkAdmin } from '../utils/chekAuthAdmin';

interface User {
    _id: string,
    role: UserRole
}
export const create = async (req: Request, res: Response) => {
    try {

        const doc = new ReservModel({
            fullName: req.body.fullName,
            phone: req.body.phone,
            persons: req.body.persons,
            date: req.body.date,
            comment: req.body.comment
        })

        const reserv = await doc.save()

        res.json(reserv)

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось создать резерв"
        })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const reservId = req.params.id;

        checkAdmin(req.headers.role as UserRole, res);

        (async (err, doc) => {
            await ReservModel.findByIdAndUpdate(
                {
                    _id: reservId
                },
                {
                    fullName: req.body.fullName,
                    phone: req.body.phone,
                    persons: req.body.persons,
                    date: req.body.date,
                    comment: req.body.comment
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
            message: "Не удалось ОБНОВИТЬ"
        })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const reservId = req.params.id;

        (async (err, doc) => {
            await ReservModel.findById(
                {
                    _id: reservId
                });

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "err Не удалось вернуть блюдо"
                })
            }

        })()

        const doc = await ReservModel.findById(reservId)

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

        checkAdmin(req.headers.role as UserRole, res);
        const reservs = await ReservModel.find().exec()

        res.json(reservs)
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

        const reservId = req.params.id;

        (async (err, doc) => {
            await ReservModel.findByIdAndDelete(
                {
                    _id: reservId
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