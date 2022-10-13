import { Request, Response } from "express";
import Sales from "../../models/Sales";
// import mercadopago from 'mercadopago'

export const webHook = async (req: Request, res: Response) => {
    try {
        const all = req.body
        const pay = new Sales({pay: all})
        console.log(pay)
        res.status(200).json(pay)
    } catch (error) {
        console.log(error)
    }
  
  }