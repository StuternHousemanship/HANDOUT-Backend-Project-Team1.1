import { Request, Response} from 'express'
import {logoutService} from '../services/auth/logout'

export const logout = async (req: Request, res: Response) => {
    logoutService(req, res)
}