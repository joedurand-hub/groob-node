import { Request, Response } from "express";
import mercadopago from 'mercadopago'

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_PRUE_MP
});

export const mPayment = async (req: Request, res: Response) => {
  const { nombreDelProducto, price, quantity, descripcion, 
    nombre, apellido, email, direccion, numeroDireccion, area, tel, postal, } = req.body

  const cantidad = parseInt(quantity)
  const precio = parseInt(price)
  try {

    let preference = {
      items: [
        {
          title: nombreDelProducto,
          unit_price: precio,
          quantity: cantidad,
          description: descripcion,
          currency_id: "ARS",
        }
      ],
      // payer: {
      //   "name": nombre,
      //   "surname": apellido,
      //   "email": email,
      //   "phone": {
      //     "area_code": area,
      //     "number": tel
      //   },
      //   "address": {
      //     "zip_code": postal,
      //     "street_name": direccion,
      //     "street_number": numeroDireccion
      //   },

      // },
      
      back_urls: {
        "success": "https://groob-backend-production.up.railway.app/success",
        "pending": "https://groob-backend-production.up.railway.app/pending",
        "failure": "https://groob-backend-production.up.railway.app/error",
      },
      auto_return: "approved",
      notification_url: "https://groob-backend-production.up.railway.app/notifications",
    };

    mercadopago.preferences.create(preference)
      .then((response) => {
        console.log(response)
        res.json(response)
      })


  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }

}