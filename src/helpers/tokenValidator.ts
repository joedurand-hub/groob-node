import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"


export const TokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({
        auth: false,
        message: 'Access denied'
    })

    const payload = jwt.verify(token, process.env.TOKEN_KEY_JWT || 'tokentest')
    return payload && next()
}
