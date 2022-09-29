"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_controller_1 = require("../controllers/bussines/checkout.controller");
const router = (0, express_1.Router)();
router.post('/checkout', checkout_controller_1.mPayment);
module.exports = router;
