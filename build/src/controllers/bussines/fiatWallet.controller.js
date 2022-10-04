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
exports.updateFiatWallet = exports.getFiatWallet = exports.createFiatWallet = void 0;
const constants_1 = require("./../../libs/constants");
const User_1 = __importDefault(require("../../models/User"));
const Fiat_1 = __importDefault(require("../../models/Fiat"));
const createFiatWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entity, CBU, CVU, alias } = req.body;
        const user = yield User_1.default.findById(req.userId);
        const newFiat = new Fiat_1.default({ entity, CBU, CVU, alias });
        const result = yield newFiat.save();
        const FiatId = result === null || result === void 0 ? void 0 : result._id;
        if (user != undefined) {
            user.fiatWallets = user.fiatWallets.concat(FiatId);
        }
        yield user.save();
        res.status(200).json(result);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.createFiatWallet = createFiatWallet;
const getFiatWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileData = yield User_1.default.findById(req.userId, { password: 0 });
        const allWalletsFiat = profileData === null || profileData === void 0 ? void 0 : profileData.fiatWallets;
        const wallets = yield Fiat_1.default.find({
            _id: {
                $in: allWalletsFiat
            }
        });
        res.status(200).json(wallets);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("error:", error);
        return res.status(404).json(error);
    }
});
exports.getFiatWallet = getFiatWallet;
const updateFiatWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entity, CBU, CVU, alias } = req.body;
        const { id } = req.params;
        const wallet = yield Fiat_1.default.findById(id, { password: 0 });
        yield Fiat_1.default.findByIdAndUpdate({ _id: wallet._id }, { entity, CBU, CVU, alias });
        res.status(200).json({ message: "Wallet updated!" });
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
});
exports.updateFiatWallet = updateFiatWallet;
