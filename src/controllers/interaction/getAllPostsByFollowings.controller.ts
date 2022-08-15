import { Request, Response } from "express";
import User from '../../models/User'
import Publication from "../../models/Publication";
import { closeConnectionInMongoose } from "../../libs/constants";

export const getAllPostsByFollowings = async (req: Request, res: Response) => {
    try {

        const myUser = await User.findById(req.userId, { password: 0, followers: 0, followings: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 })

        // traigo mi usuario y busco los id de mis publicaciones
        let myPosts = myUser.publications.map((id) => id)

        // busco mis publicaciones en el modelo
        const postsByMyUser = await Publication.find({
            _id: {
                $in: myPosts
            }
        })
        // postsByMyUser.push(myUser)
        res.json(postsByMyUser)
        // console.log(postsByMyUser) // acá deberían estar todas mis publicaciones con mis datos

        // if (myUser !== undefined) {
        //     let allMyIds = myUser.followings.map((id) => id) 
        //     const postsByFollowings = await Publication.find({
        //         user: {
        //             $in: allMyIds
        //         }
        //     })

        //     let idsInPost = postsByFollowings.map((obj) => obj.user) 
        //     const usersId = await User.find({
        //         _id: {
        //             $in: idsInPost
        //         }
        //     }, { password: 0 }, {followers: 0})

        //     console.log(postsByMyUser)

        //     const data = usersId.concat(postsByFollowings) // concateno los usuarios y los posts
        //     const allDataForFollowings = data.map(obj => {
        //         if(obj.content && obj.image === undefined && obj.price === undefined) {
        //             return {
        //                 user: obj.user,
        //                 userId: obj._id,
        //                 username: obj.userName, 
        //                 picture: obj.profilePicture, 
        //                 content: obj.content, 
        //                 date: obj.createdAt
        //             }
        //         }
        //         if(obj.image && obj.content === undefined && obj.price === undefined) {
        //             return {
        //                 user: obj.user,
        //                 userId: obj._id,
        //                 username: obj.userName, 
        //                 picture: obj.profilePicture, 
        //                 image: obj.image.secure_url, 
        //                 imageId: obj.image.public_id,
        //                 date: obj.createdAt
        //             }
        //         }
        //         if(obj.image && obj.content && obj.price === undefined) {
        //             return {
        //                 user: obj.user,
        //                 userId: obj._id,
        //                 username: obj.userName, 
        //                 picture: obj.profilePicture, 
        //                 content: obj.content, 
        //                 image: obj.image.secure_url, 
        //                 imageId: obj.image.public_id,
        //                 date: obj.createdAt
        //             }
        //         }
        //         if(obj.price && obj.image && obj.content) {
        //             return {
        //                 user: obj.user,
        //                 userId: obj._id,
        //                 username: obj.userName, 
        //                 picture: obj.profilePicture, 
        //                 content: obj.content, 
        //                 image: obj.image.secure_url, 
        //                 imageId: obj.image.public_id,
        //                 price: obj.price, 
        //                 date: obj.createdAt
        //             }
        //         }
        //         })
        //     console.log(allDataForFollowings)

        //         const allPostsInFeed = postsByMyUser.concat(allDataForFollowings)
        //         res.json(allPostsInFeed) // funciona, falta ordenar por fecha mas reciente

        closeConnectionInMongoose
        // }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

