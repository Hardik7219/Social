import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../config/cloudinary.js";

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password")
        if (!user) return res.json({ status: 401, message: 'user not found' })

        res.json(user)

    } catch (error) {
        console.log(error)
        req.json({ status: 500, message: "internal server error" })
    }
}

export const follow = async (req, res) => {
    try {
        const { id } = req.params;
        const diffUser = await User.findById(id).select("-password")
        const currentUser = await User.findById(req.user._id);
        if (!diffUser || !currentUser) return res.json({ status: 401, message: 'user not found' })

        if (id === currentUser._id) return res.json({ status: 300, message: 'can not follow yourself' })

        const isfollow = currentUser.following.includes(diffUser._id);
        if (isfollow) {
            await User.findByIdAndUpdate(currentUser._id, { $pull: { following: diffUser._id } })
            await User.findByIdAndUpdate(diffUser._id, { $pull: { followers: currentUser._id } })

            res.status(200).json({ message: "User unfollowed successfully" });
        }
        else {
            await User.findByIdAndUpdate(currentUser._id, { $push: { following: diffUser._id } })
            await User.findByIdAndUpdate(diffUser._id, { $push: { followers: currentUser._id } })

            const newNotification = await Notification({
                from: currentUser._id,
                to: diffUser._id,
                type: "follow"
            })
            await newNotification.save();
            res.status(200).json({ message: "User followed successfully" });

        }
    } catch (error) {
        console.log(error)
        req.json({ status: 500, message: "internal server error" })
    }
}

export const suggestedFollower = async (req, res) => {
    try {
        const id = req.user._id;
        const usersFollowedByMe = await User.findById(id).select("following");
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: id },
                },
            },
            { $sample: { size: 10 } },
        ]);

        const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log(error)
        res.json({ status: 500, message: "internal server error" })
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { username, name, bio, currentPassword } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!currentPassword) {
            return res.status(400).json({ message: "Password is required" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password is wrong" });
        }

        if (username && username !== user.username) {
            const existing = await User.findOne({ username });
            if (existing) {
                return res.status(400).json({ message: "Username is already taken" });
            }
        }

        const updates = {};
        if (username) updates.username = username.trim();
        if (name !== undefined) updates.name = name.trim();
        if (bio !== undefined) updates.bio = bio.trim();

        if (req.file) {
            if (user.avatarPublicId) {
                await cloudinary.uploader.destroy(user.avatarPublicId);
            }
            const uploadedResponse = await cloudinary.uploader.upload(req.file.path);
            updates.avatar = uploadedResponse.secure_url;
            updates.avatarPublicId = uploadedResponse.public_id;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserFollowers = async (req, res) => {
    try {

        const { id } = req.params;   
        const user = await User.findById(id)
            .populate({
                path: "followers",
                select: "username name avatar _id"
            })
            .lean();

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            followers: user.followers
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getUserFollowings = async (req, res) => {
    try {

        const { id } = req.params;
        
        const user = await User.findById(id)
            .populate({
                path: "following",
                select: "username name avatar bio"
            })
            .lean();

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }        
        return res.status(200).json({
            success: true,
            followings: user.following
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};