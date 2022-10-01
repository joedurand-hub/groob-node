import { closeConnectionInMongoose } from './../../libs/constants';
import { Request, Response } from "express";
import User from "../../models/User"
import Crypto from "../../models/Crypto"

export const createCryptoWallet = async (req: Request, res: Response) => {
    try {
        const { entity, CBU, CVU, alias } = req.body
        const userCBU = parseInt(CBU)
        const userCVU = parseInt(CVU)
        console.log(entity, userCBU, userCVU, alias)

        const user = await User.findById(req.userId)

        const newFiat = new Crypto({ entity, CBU, CVU, alias })
        console.log(newFiat)

        const result = await newFiat.save()
        const FiatId = result?._id
        if (user != undefined) {
            user.fiatWallets = user.fiatWallets.concat(FiatId)
        }
        await user.save()
        res.status(200).json(result)
        return closeConnectionInMongoose

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getCryptoWallet = async (
    req: Request<unknown, unknown, unknown>,
    res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 })

        const allWalletsFiat = profileData?.fiatWallets

        const wallets = await Crypto.find({
            _id: {
                $in: allWalletsFiat
            }
        })

        res.status(200).json(wallets)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("error:", error)
        return res.status(404).json(error)
    }
}

export const updateProfile = async (
    req: Request<unknown, unknown, unknown>,
    res: Response) => {
    try {
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}
