import { UserRole } from "../models/User"
import {Response} from "express"

export const checkAdmin = (role: UserRole, res: Response) => {
    if (role != UserRole.admin) {

        return res.status(500).json(
            { message: "ERR Не удалось ОБНОВИТЬ" })

    }
}