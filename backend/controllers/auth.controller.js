import { generateToken } from "../lib/generatetoken.js";
import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signin = async (req, res) => {
    try {
        console.log(req.body);
        const { username, name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) return res.json({ status: 400, message: "user is already exist" });
        if (password.length < 6) return res.json({ message: 'password should atleast be 6 character long' })

        const bash = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, bash);
        const createUser = await userModel.create({
            username,
            name,
            email,
            password: hashPass
        })
        res.json({ status: 200, message: 'user created' })
    } catch (error) {
        console.log(`signin error: ${error.message}`)
        return res.json({ status: 500, message: 'internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ status: 401, message: 'user not found' })
        const isMatch = await bcrypt.compare(password, user?.password || "")
        if (!isMatch) return res.json({ status: 401, message: 'password or email is wrong' })

        generateToken(user._id, res)

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getData = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password')
        res.json({ status: 200, user })
    } catch (error) {
        console.log("Error in geting data of user controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}