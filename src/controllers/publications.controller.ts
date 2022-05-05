import { RequestHandler, Request, Response } from "express";
import Publication, { PublicationI } from '../models/Publication'
import User from "../models/User";

export const createPost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { content } = req.body

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json("No user found")
        const publication: PublicationI = new Publication({ content, user: user?._id })

        const publicationSaved = await publication.save()
        const postIdForTheUser = publicationSaved?._id
        if (user != undefined) {
            user.publications = user.publications.concat(postIdForTheUser)
        }
        await user.save()
        res.status(201).json(publicationSaved)

    } catch (error) {
        console.log(error)
        res.status(400).send("Mandaste cualquier cosa amigo")
    }
}


export const getAllPostsAndUsers: RequestHandler = async (_req: Request, res: Response) => {
    try {
        const allUsers: readonly string[] = await User.find()
        const allPublications: readonly string[] = await Publication.find()

        const postsInFeed = [allUsers.concat(allPublications)].flat()

        res.send(postsInFeed)
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const getPostById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    try {
        const post = await Publication.findById({ _id: id })
        console.log("post:", post)
        res.send(post)
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const searchPost: RequestHandler = async (_req: Request, _res: Response) => {
    try {
        let allPublications = await Publication.find()
        console.log("todos los post", allPublications)
        // const result = allPublications.filter((publication:string) => {
        //     if (publication?.content && publication?.content.toLowerCase().includes(content.toLowerCase())) {
        //         return publication
        //     }
        // })
        // console.log(result) 
        // return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }

}

export const deletePost: RequestHandler = async (_req: Request, _res: Response) => {
    // const 
    // const nftDb = await Product.findByIdAndDelete({ _id: id })
    // res.json('Eliminando Post')
}

export const updatePost: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando Post')
}