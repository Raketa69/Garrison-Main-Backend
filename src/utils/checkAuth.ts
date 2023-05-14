import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from 'express';
import { UserRole } from "../models/User";

interface User {
    _id: string,
    role: UserRole
}

export default (req: Request, res: Response, next: NextFunction) => {

    const token: string = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_JWT!)
            req.headers.userId = (decoded as User)._id
            req.headers.role = (decoded as User).role
            next()
        } catch (error) {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }
}