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
exports.updateProfile = exports.getCryptoWallet = exports.createCryptoWallet = void 0;
const constants_1 = require("./../../libs/constants");
const User_1 = __importDefault(require("../../models/User"));
const Crypto_1 = __importDefault(require("../../models/Crypto"));
const createCryptoWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entity, CBU, CVU, alias } = req.body;
        const userCBU = parseInt(CBU);
        const userCVU = parseInt(CVU);
        console.log(entity, userCBU, userCVU, alias);
        const user = yield User_1.default.findById(req.userId);
        const newFiat = new Crypto_1.default({ entity, CBU, CVU, alias });
        console.log(newFiat);
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
exports.createCryptoWallet = createCryptoWallet;
const getCryptoWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileData = yield User_1.default.findById(req.userId, { password: 0 });
        const allWalletsFiat = profileData === null || profileData === void 0 ? void 0 : profileData.fiatWallets;
        const wallets = yield Crypto_1.default.find({
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
exports.getCryptoWallet = getCryptoWallet;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
});
exports.updateProfile = updateProfile;
