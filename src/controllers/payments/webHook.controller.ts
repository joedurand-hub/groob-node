import { Request, Response } from "express";
import fs from "fs"
import axios from "axios"
import Payment from "../../models/Payment";
// import mercadopago from 'mercadopago'


export const webHook = async (req: Request, res: Response) => {
    try {

        console.log(req.body)
        const { id } = req.body

        const compra = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_PRUE_MP}`
            }
        })
        console.log(compra)
        // const pay = new Payment(req.body)

        res.status(200).send('ok')
    } catch (error) {
        console.log(error)
    }

}
