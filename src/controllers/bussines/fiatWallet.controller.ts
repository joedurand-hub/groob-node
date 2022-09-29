import { closeConnectionInMongoose } from './../../libs/constants';
import { Request, Response } from "express";
import User from "../../models/User"
import Fiat from "../../models/Fiat"

export const createFiatWallet = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId)
        const wallet = await Fiat.findOne({
            members: { $all: [req.userId, req.body.recivedId] }
        })

        if (wallet !== undefined && wallet !== null) {
            res.status(200).json({ message: "la Wallet ya existe boludín:", wallet })
            return closeConnectionInMongoose
        }

        else {
            const newFiat = new Fiat({ members: [req.body.senderId, req.body.recivedId] })
            const result = await newFiat.save()
            const FiatId = result?._id
            if (user != undefined) user.Fiats = user.Fiats.concat(FiatId)
            await user.save()
            res.status(200).json(result)
            return closeConnectionInMongoose
        }

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getFiatWallet = async (
    req: Request<unknown, unknown, unknown>,
    res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 })

        const myId = req.userId?.toString()
        if (profileData !== undefined) {
            profileData.visits = profileData.visits.concat(myId)
        }
        await profileData.save()

        res.status(200).json({ profileData, myId })
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}

export const updateFiatWallet = async (
    req: Request<unknown, unknown, unknown>,
    res: Response) => {
    try {
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}
