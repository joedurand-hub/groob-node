import { Request, Response } from "express";
import fs from "fs"
import axios from "axios"
import User from "../../../models/User";
// import mercadopago from 'mercadopago'


export const webHook = async (req: Request, res: Response) => {
    try {

        // console.log(req.body)
        const { data } = req.body

        const compra = await axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_PRUE_MP}`
            }
        })
        console.log(compra.data)

        if(compra.data.status === "approved" && compra.data.status_detail === "accredited") {
            const user = await User.findByIdAndUpdate({_id: compra.data.items.id}, {
                verificationPay: true
            })
        }
        
        res.status(200).send('ok')
    } catch (error) {
        console.log(error)
    }

}
