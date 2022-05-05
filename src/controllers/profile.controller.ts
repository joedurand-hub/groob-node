import { RequestHandler, Request, Response } from "express";
import User from '../models/User'
import Publication from '../models/Publication'

export const getRcommendedUsersByPublicationsOnTheMoment: RequestHandler = async (_req: Request, _res: Response) => {
    const allUsers: readonly string[] = await User.find()
    const allPublications: readonly string[] = await Publication.find()

    const recomended = [allUsers.concat(allPublications)].flat()
    try {
        console.log("recomended:", recomended)
    } catch (error) {
        console.log(error)
    }
}

export const getProfile: RequestHandler = async (req: Request, res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 }).populate({
            path: 'publications',
            select: 'publications',
            options: { limit: 10 }
        })
        console.log("profile:", profileData)
        return res.status(200).json(profileData)

    } catch (error) {
        console.log("No se pudo traer el perfil", error)
        return res.status(404).json(error)
    }
}

export const updateProfile: RequestHandler = async (_req: Request, _res: Response) => {
    // const { artist, description, profilePic, address} = req.body;
    // let profileUser = await User.findOne({token})
    // profileUser.artist = artist;
    // profileUser.description = description;
    // profileUser.profilePic = profilePic;
    // profileUser.address= address;
    // await profileUser.save();
    // res.json(profileUser);
}

export const deleteProfile: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.deleteOne({ _id: id })
        console.log("user eliminado", user)
        res.status(200).json(`Eliminando el usuario ${user}`)
    } catch (error) {
        res.status(500).json("algo salió mal")
        console.log(error)
    }
}
