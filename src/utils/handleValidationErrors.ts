import { validationResult } from 'express-validator'
import express, { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json(error.array())
    }
    console.log('validationResult')
    next()
}