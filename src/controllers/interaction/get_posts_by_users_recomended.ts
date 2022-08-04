// import { RequestHandler, Request, Response } from "express";
// import Publication, { PublicationI } from '../models/Publication'
// import User from '../models/User'

// export const get_rcommended_users_by_publications_on_the_moment: RequestHandler = async (_req: Request, _res: Response) => {
//     try {
    // const allUsers: readonly string[] = await User.find()
    // const allPublications: readonly string[] = await Publication.find()

    // const postsInFeed = [allUsers.concat(allPublications)].flat()

    // res.send(postsInFeed)
    
//         // postsRecomended = User.agregate([
//         //     {
//         //       // etapa $lookup
//         //       $lookup:
//         //         {
//         //           from: 'user', // <- nombre de la colección de donde se extrae la data
//         //           localField: 'user', // <- nombre del campo local (post.user) que tiene la referencia a users
//         //           foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
//         //           as: 'user' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
//         //         }
//         //       },
//         //       // etapa $unwind
//         //       {
//         //         $unwind: '$user' // <- nombre del campo que contiene el array de objetos
//         //       },
//         //       // etapa $match
//         //       {
//         //         $match: {
//         //           'user.premium': req.params.premium // <- condición que se evaluará para filtrar el resultado
//         //         }
//         //       }
//         //     }
//         //   ]);
//         // // const allPublications: readonly string[] = await Publication.find()
    
//         // // const recomended = [allUsers.concat(allPublications)].flat()
//         console.log("recomended:", allUsers)
//     } catch (error) {
//         console.log(error)
//     }
// }
