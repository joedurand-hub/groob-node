import { Request, Response } from "express";
import mercadopago from 'mercadopago'

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_PRUE_MP
});

export const verifyAccountPay = async (req: Request, res: Response) => {
  const { idToVerify, title, price, quantity, picURL, descripcion, 
    nombre, apellido, email, direccion, numeroDireccion, area, tel, postal, } = req.body
    
  try {

    let preference = {  
      items: [
        {
          id: idToVerify,
          title: title,
          unit_price: parseInt(price),
          quantity: parseInt(quantity),
          description: descripcion,
          currency_id: "ARS",
          picture_url: picURL,
        }
      ],
      payer: {
        "name": nombre,
        "surname": apellido,
        "email": email,
        "phone": {
          "area_code": area,
          "number": tel
        },
        "address": {
          "zip_code": postal,
          "street_name": direccion,
          "street_number": numeroDireccion
        },

      },
      
      back_urls: {
        "success": "https://groob.com.ar/notifications/success",
        "pending": "https://groob.com.ar/notifications/pending",
        "failure": "https://groob.com.ar/notifications/error",
      },
      auto_return: "approved",
      notification_url: "https://groob-back-production.up.railway.app/notifications",
    };

    mercadopago.preferences.create(preference)
      .then((response) => {
        console.log(response.body)
        res.json(response.body.init_point)
      })


  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }

}