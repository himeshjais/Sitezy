import { User } from "../models/userModel.js"
import jwt from "jsonwebtoken"

// login kiye -> token generate hua -> cookie mein set kiye 
export const googleAuth = async(req, res)=> {
    try {
        // jb first time login kr rhe ye 3 chahiye
        const {name, email, avatar} = req.body // frontend se pass kr rhe backend mein so using req.body
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name,
                email,
                avatar
            })
        }

        // token generated/created
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "7d"})

        // setting that generated token in cookie (cookie generated)
        // send response to frontend
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)
        // OR
        // return res.status(200).json({
        //     success: true,
        //     message: "User logged in successfully",
        //     token,
        //     user
        // })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export const logout = async(req, res)=> {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
