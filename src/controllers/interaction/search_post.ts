// import { RequestHandler, Request, Response } from "express";
// import Publication, { PublicationI } from '../models/Publication'
// import User from '../../models/User'

// export const search_post_or_user: RequestHandler = async (_req: Request, _res: Response) => {
//     try {
//         let allPublications = await Publication.find()
//         console.log("todos los post", allPublications)
//         // const result = allPublications.filter((publication:string) => {
//         //     if (publication?.content && publication?.content.toLowerCase().includes(content.toLowerCase())) {
//         //         return publication
//         //     }
//         // })
//         // console.log(result) 
//         // return res.status(200).json(result)
//     } catch (error) {
//         console.log(error)
//     }

// }