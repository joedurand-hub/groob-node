import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

interface PayloadI {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authtoken')
    if(!token) return res.status(401).json({
        error: "acceso denegado",
        auth: false,
        message: 'Access denied'
    })
    const payload = jwt.verify(token, process.env.TOKEN_KEY_JWT || 'tokentest') as PayloadI
    req.userId = payload._id
    next()

}
