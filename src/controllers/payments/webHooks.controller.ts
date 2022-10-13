import { Request, Response } from "express";
// import mercadopago from 'mercadopago'

export const mPayment = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        res.status(200).json("Todo piola")
    } catch (error) {
        
    }
  
  }