import { Request, Response, NextFunction } from "express";
import User from '../models/User'
import Publication from '../models/Publication'
import fs from "fs-extra"
import { uploadImage } from "../libs/cloudinary";
// import {  deleteImage } from "../libs/cloudinary";
import { closeConnectionInMongoose } from "../libs/constants";
import { UpdateProfileBodyType, ValidateProfileParamsType } from "../schemas/profile.schema";




export const getProfile = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>,
    res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 }).populate({
            path: 'publications',
            select: 'publications',
            options: { limit: 10 }
        })
        res.status(200).json(profileData)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}


export const getReducedUser = async (req: Request, res: Response) => {
    try {

        const myUser = await User.findById(req.userId, { password: 0, followers: 0, followings: 0, publications: 0, description: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 })
        res.status(200).json(myUser)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)

    }
}


export const getReducedUserById = async (req: Request<ValidateProfileParamsType, unknown, unknown>, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, { password: 0, followers: 0, followings: 0, publications: 0, description: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 })
        res.status(200).json(user)

    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)

    }
}

export const getAllProfiles = async (_req: Request, res: Response) => {
    try {

        const allProfiles = await User.find()
        res.status(200).json(allProfiles)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const getProfileById = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>,
    res: Response) => {
    try {
        const { id } = req.params
        const profileData = await User.findById(id, { password: 0 })

        const myId = req.userId?.toString()
        if (profileData !== undefined) {
            profileData.visits = profileData.visits.concat(myId)
        }
        await profileData.save()

        res.status(200).json({ profileData, myId })
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}

export const updateProfile = async (
    req: Request<ValidateProfileParamsType, unknown, UpdateProfileBodyType>,
    res: Response) => {
    try {
        const { userName, description, phone, email, birthday, firstName, lastName,
            online, premium, verified, explicitContent } = req.body;
            console.log(req.body)
        const { id } = req.params
        const user = await User.findById(id, { password: 0 })
        const userUpdated = await User.findOneAndUpdate(
            { _id: user._id },
            {
                userName, description, phone, email, birthday, firstName, lastName,
                online, premium, verified, explicitContent
            })
        await Publication.updateMany({ user: req.userId }, { userName: userName, userVerified: verified})
        res.status(200).json({ message: "User updated!", userUpdated });
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}


export const pictureProfile = async (
    req: Request<ValidateProfileParamsType, unknown, UpdateProfileBodyType>,
    res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, { password: 0 })
        let obj = {}
        if (req.files) {
            const files = req.files['image']
            if (files) {
                for (const file of files) {
                    const result = await uploadImage({ filePath: file.path })
                    obj = {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    }
                    await fs.unlink(file.path)
                }
            }
        }
        if (user !== undefined) {
            user.profilePicture = obj
            const userUpdated = await user.save()
            const pictureUpdated = userUpdated.profilePicture
            res.status(200).json({ pictureUpdated });

            // let myPosts = user.publications.map((id) => id)
            await Publication.updateMany({ userName: user.userName }, { profilePicture: pictureUpdated.secure_url})}
            
            closeConnectionInMongoose
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}


export const deleteProfile = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>,
    res: Response) => {
    try {
        const { id } = req.params;
        const myUser = await User.findById({ _id: id })
        console.log(myUser)
        const allPostsToDelete = myUser.publications.map(id => id)

        const allPosts = await Publication.find({
            _id: {
                $in: allPostsToDelete
            }
        })
        const postsDeleted = await Publication.deleteMany({ _id: allPosts })
        const userDeleted = await User.deleteOne({ myUser })
        res.status(200).json({ message: `User and posts deleted`, postsDeleted, userDeleted })
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getAllPostsByUser = async (req: Request, res: Response) => {
    // Hacer paginado cada 7 posts así en el front se realiza infinity scroll
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const posts = await Publication.find()
        const userId = user._id.toString()
        const postsByUser = posts.filter(post => {
            if (userId === post.user.toString()) {
                return post;
            }
        })
        const data = postsByUser.sort((a: any, b: any) => {
            if (a.createdAt < b.createdAt) return 1;
            return -1;
        })
        res.status(200).json(data)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}
