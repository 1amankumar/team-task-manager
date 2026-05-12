import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import genToken from "../utils/token.js"

export const signUp = async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already Exists" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast be 6 characters." })
        }
        if (mobile.length < 10) {
            return res.status(400).json({ message: "Invalid numbers." })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            role,
            mobile,
            password: hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })


        return res.status(201).json(user)


    } catch (error) {
        console.log("Signup Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
}


//signIn controller
export const sigIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password." })
        }


        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })


        return res.status(200).json(user)


    } catch (error) {
        return res.status(500).json(`signIn error ${error}`)
    }
}

//signOut controller
export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout Successfully." })
    } catch (error) {
        return res.status(500).json(`signout error ${error}`)

    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select(
            "-password"
        );

        return res.status(200).json({
            users
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};