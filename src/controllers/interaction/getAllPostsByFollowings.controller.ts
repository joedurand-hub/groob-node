import { Request, Response } from "express";
import User from '../../models/User'
import Publication from "../../models/Publication";
import { closeConnectionInMongoose } from "../../libs/constants";

export const getAllPostsByFollowings = async (req: Request, res: Response) => {
    try {

        const myUser = await User.findById(req.userId, { password: 0, followers: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 })

        // traigo mi usuario y busco los id de mis publicaciones
        let myPosts = myUser.publications.map((id) => id)

        // busco mis publicaciones en el modelo
        const postsByMyUser = await Publication.find({
            _id: {
                $in: myPosts
            }
        })

        let allMyIds = myUser.followings.map((id) => id)
        // busco las publicaciones de quienes sigo
        const postsByFollowings = await Publication.find({
            user: {
                $in: allMyIds
            }
        })
        if(myUser.explicitContent === true) {
            const data = postsByMyUser.concat(postsByFollowings) // concateno los usuarios y los posts
            console.log(data)
            
            res.status(200).json(data)
        } else {
            const postWithOutExplicitContent = postsByFollowings.filter(post => post.explicitContent === false)
            const data = postsByMyUser.concat(postWithOutExplicitContent) // concateno los usuarios y los posts
            console.log(data)
            res.status(200).json(data)

        }
        closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(400).json(error) 
    }
}

