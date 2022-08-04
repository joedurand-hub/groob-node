import { Request, Response } from "express";
import Publication from '../models/Publication'
import User from "../models/User";
import fs from "fs-extra"
import { closeConnectionInMongoose } from "../libs/constants";
import { uploadImage, deleteImage } from "../libs/cloudinary";
import { CreatePublicationType, GetOrDeletePublicationByIdType } from '../schemas/publications.schema'


export const createPost = async (req: Request<unknown, unknown, CreatePublicationType>, res: Response) => {
    try {
        const { content, price } = req.body
        const priceValue = Number(price)
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json("No user found")
        const publication = new Publication({ 
            content, 
            priceValue, 
            user: user?._id
        })
        if(req.file) {
           const result = await uploadImage({ filePath: req.file.path })
          publication.image = {
            public_id: result.public_id,
            secure_url: result.secure_url, 
          }
          await fs.unlink(req.file.path)
        }


        const publicationSaved = await publication.save()
        const postIdForTheUser = publicationSaved?._id
        if (user != undefined) {
            user.publications = user.publications.concat(postIdForTheUser)
        }
        await user.save()
        res.status(201).json(publicationSaved)
        closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(400).send("Mandaste cualquier cosa")
    }
}

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        // Traes los post por id en base a sus followings
        const posts = await Publication.find()
        res.status(200).json(posts)
        closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}


export const getPostById = async (req: Request<GetOrDeletePublicationByIdType, unknown, unknown>, res: Response) => {
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


export const deletePost = async (req: Request<GetOrDeletePublicationByIdType, unknown, unknown>, res: Response) => {
    try {
        const { id } = req.params
        const post = await Publication.findById(id)
        if(!post) {
            return res.status(404).json({message: "No se ha encontrado la publicación"})
        }
        const postInUser = await User.findById({ _id: req.userId})
        await Publication.deleteOne({ _id: id })
        if(post.image?.public_id) {
        await deleteImage(post.image.public_id)
        }
        if(postInUser !== undefined) {
            postInUser.publications = postInUser.publications.filter(postId => id.toString() !== postId)
        }
        await postInUser.save()
        res.status(200).json(`Publicación eliminada`)
        return closeConnectionInMongoose
    } catch (error) {
        res.status(500).send('An internal server error occurred');
        console.log(error)
    }
}