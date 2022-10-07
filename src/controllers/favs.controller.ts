
import { Request, Response } from "express";
import Publication from '../models/Publication'
import User from "../models/User";
import { closeConnectionInMongoose } from "../libs/constants";
import { CreatePublicationType, GetOrDeletePublicationByIdType } from '../schemas/publications.schema'

export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { idPostLiked } = req.body
        console.log(idPostLiked)
        const post = await Publication.findById({ _id: id })
        const updatedPost = await Publication.findByIdAndUpdate(id, { likes: post.likes + 1 }, { new: true })
        res.status(200).json(updatedPost.likes)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const dislikePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await Publication.findById({ _id: id })
        const updatedPost = await Publication.findByIdAndUpdate(id, { likes: post.likes - 1 }, { new: true })
        res.status(200).json(updatedPost)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}
