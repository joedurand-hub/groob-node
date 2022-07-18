import { Request, Response } from "express";
import Publication from '../models/Publication'
import User from "../models/User";
import mongoose from "mongoose";
import { CreatePublicationType, GetOrDeletePublicationByIdType } from '../schemas/publications.schema'

const closeConnectionInMongoose = mongoose.connection.close();

export const create_post = async (req: Request<unknown, unknown, CreatePublicationType>, res: Response) => {
    try {
        const { content, price, image } = req.body

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json("No user found")
        const publication = new Publication({ content, price, image, user: user?._id})

        const publicationSaved = await publication.save()
        const postIdForTheUser = publicationSaved?._id
        if (user != undefined) {
            user.publications = user.publications.concat(postIdForTheUser)
        }
        await user.save()
        res.status(201).json(publicationSaved)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(400).send("Mandaste cualquier cosa amigo")
    }
}

export const get_all_posts = async (_req: Request, res: Response) => {
    try {
        // Traes los post por id en base a sus followings
        const posts = await Publication.find()
        res.status(200).json(posts)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}


export const get_post_by_id = async (req: Request<GetOrDeletePublicationByIdType, unknown, unknown>, res: Response) => {
    try {
        const { id } = req.params
        const post = await Publication.findById({ _id: id })
        res.status(200).json(post)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}


export const delete_post = async (req: Request<GetOrDeletePublicationByIdType, unknown, unknown>, res: Response) => {
    try {
        const { id } = req.params
        const postToRemove = await Publication.findById(id)
        await User.deleteMany({ _id: { $in: postToRemove.publications } })
        await Publication.deleteOne({ _id: id })
        res.status(200).json(`Publicación eliminada`)
        return closeConnectionInMongoose
    } catch (error) {
        res.status(500).send('An internal server error occurred');
        console.log(error)
    }
}