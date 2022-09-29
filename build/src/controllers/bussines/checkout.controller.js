"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mPayment = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
// Agrega credenciales
mercadopago_1.default.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
});
const mPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productTitle, price, quantity, descripcion, nombre, apellido, email, direccion, numeroDireccion, area, tel, postal, } = req.body;
    // const cantidad = parseInt(quantity)
    // const precio = parseInt(price)
    // try {
    //   let preference = {
    //     items: [
    //       {
    //         title: "compu",
    //         unit_price: 1000,
    //         quantity: 1,
    //         description: "soy una loca loca",
    //         currency_id: "ARS",
    //       }
    //       // {
    //       //   title: productTitle,
    //       //   unit_price: precio,
    //       //   quantity: cantidad,
    //       //   description: descripcion,
    //       //   currency_id: "ARS",
    //       // }
    //     ],
    //     // payer: {
    //     //   "name": nombre,
    //     //   "surname": apellido,
    //     //   "email": email,
    //     //   "phone": {
    //     //     "area_code": area,
    //     //     "number": tel
    //     //   },
    //     //   "address": {
    //     //     "zip_code": postal,
    //     //     "street_name": direccion,
    //     //     "street_number": numeroDireccion
    //     //   },
    //     // },
    //     back_urls: {
    //       "success": "htpp://localhost:5173/success",
    //       "pending": "htpp://localhost:5173/pending",
    //       "failure": "htpp://localhost:5173/error",
    //     },
    //     auto_return: "approved",
    //     notification_url: "htpp://localhost:5173/success",
    //   };
    //   mercadopago.preferences.create(preference)
    //     .then((response) => {
    //       console.log(response)
    //       res.json(response)
    //     })
    // } catch (error) {
    //   console.log(error);
    //   res.json({ message: error });
    // }
});
exports.mPayment = mPayment;
