import { Request, Response } from "express";
import fs from "fs"
import Payment from "../../models/Payment";
// import mercadopago from 'mercadopago'

export const webHook = async (req: Request, res: Response) => {
    try {

        console.log(req.body)
        let data = req.body
        const pay = new Payment(req.body)
        if (data['action'] == 'payment.created') {
            fs.writeFileSync(`${__dirname}/../webHookResponses.json`, JSON.stringify(data))
        }

        res.status(200).send('ok')
    } catch (error) {
        console.log(error)
    }

}
