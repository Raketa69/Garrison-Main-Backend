import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel, { UserDoc, UserRole } from '../models/User'
import express, { Request, Response } from 'express';

const createToken = (id: string, role: UserRole) => {
    return jwt.sign({
        _id: id,
        role: role
    }, process.env.SECRET_JWT!,
        {
            expiresIn: '30d'
        })
}

export const register = async (req: Request, res: Response) => {
    try {
        const password: string = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)


        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            phone: req.body.phone,
            role: UserRole.user
        })

        const user = await doc.save()

        const token = createToken(user._id.toString(), user.role)

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            mesagge: error
        })
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                message: 'User is undefind'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash)

        if (!isValidPass) {
            return res.status(403).json({
                message: 'Wrong email or password'
            });
        }

        const token = createToken(user._id.toString(), user.role)
        console.log(token)
        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            mesagge: 'Не удалось авторизоваться'
        })
    }

}

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.headers.userId)

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const { passwordHash, ...userData } = user._doc

        res.json(userData)

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            mesagge: error.mesagge
        })
    }


}