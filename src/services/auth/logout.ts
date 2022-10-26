import {Request, Response} from "express"

export const logoutService = async (req: Request, res: Response) => {
    try {
        res.clearCookie('handout_token')
        return res.json({
        message: 'User signed out suceessfully'
    })

    } catch (err) {
      console.log(err)
    }
}