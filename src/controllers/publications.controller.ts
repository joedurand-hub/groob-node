import { RequestHandler, Request, Response } from "express";
import Publication from '../models/Publication'
import User from "../models/User";

export const createPost: RequestHandler = async (req: Request, res: Response) => {
    // Crear un post comun
    // En otra funcion poder crear otros tipos de post
    // Y que retornen al front varios o algunos al azar y/o
    // que posean ciertas características del usuario
    const { description, image, url } = req.body
    const publication = new Publication({ description, image, url })
    console.log(publication)

    const publicationSaved:String = await publication.save()
    console.log('nuevo usuario:', publicationSaved)
    res.status(201).json(publicationSaved)
}


export const getAllPostsAndUsers: RequestHandler = async (_req: Request, res: Response) => {
    try {
        const user = await User.find()
        const allPublications = await Publication.find()

        const postsInFeed = [user.concat(allPublications)].flat()

        res.send(postsInFeed)
        // res.send("all post with users")
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const getPost: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Obteniendo 1 Post')
}

export const deletePost: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Eliminando Post')
}

export const updatePost: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando Post')
}