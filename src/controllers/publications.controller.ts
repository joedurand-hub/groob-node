import { Request, Response } from "express";
import Publication from '../models/Publication'
import User from "../models/User";
import fs from "fs-extra"
import { uploadImage, deleteImage } from "../libs/cloudinary";
import { closeConnectionInMongoose } from "../libs/constants";
import { CreatePublicationType, GetOrDeletePublicationByIdType } from '../schemas/publications.schema'


export const createPost = async (req: Request<unknown, unknown, CreatePublicationType>, res: Response) => {
    try {
        const { content, price, explicitContent } = req.body
        console.log(price)
        const priceValue: number = parseInt(price)
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json("No user found")
        const publication = new Publication({ 
            content, price: priceValue, explicitContent, user: user?._id, userName: user?.userName,
            profilePicture: user?.profilePicture.secure_url 
        })
        if(req.files) {
            const files = req.files['images']
            const data: any[] = []
            for (const file of files) {
                const result = await uploadImage({filePath: file.path}) 
                data.push({public_id: result.public_id, secure_url: result.secure_url})
                await fs.unlink(file.path)
            }
            publication.images = data
        }
        const publicationSaved = await publication.save()
        const postIdForTheUser = publicationSaved?._id
        if (user != undefined) user.publications = user.publications.concat(postIdForTheUser)
        await user.save()
        res.status(201).json(publicationSaved)
        closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(400).send("Mandaste cualquier cosa")
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

export const commentPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { value } = req.body
        if(value === undefined) res.status(400).json("El comentario no puede estar vacío")
        if(value.length > 500)  res.status(400).json("El comentario no puede superar los 500 caracteres")
        const post = await Publication.findById({ _id: id })
        post.comments.push(value)
        const updatedPost = await Publication.findByIdAndUpdate(id, post, {new: true})
        res.status(200).json(updatedPost)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await Publication.findById({ _id: id })
        const updatedPost = await Publication.findByIdAndUpdate(id, {likes: post.likes + 1}, {new: true})
        res.status(200).json(updatedPost)
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
        const updatedPost = await Publication.findByIdAndUpdate(id, {likes: post.likes - 1}, {new: true})
        res.status(200).json(updatedPost)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}
