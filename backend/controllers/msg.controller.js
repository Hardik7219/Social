import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import Msg from "../models/msg.model.js";


export const sendMsg = async (
    req,
    res
) => {

    try {

        const { msg } = req.body;

        const { id } = req.params;

        const senderId = req.user._id;
        if (!msg || msg.trim() === "") {

            return res.status(400).json({
                message: "Empty message"
            });
        }

        const user = await User.findById(
            senderId
        );

        const resUser = await User.findById(
            id
        );

        // check sender
        if (!user) {

            return res.status(404).json({
                message: "Sender not found"
            });
        }

        // check receiver
        if (!resUser) {

            return res.status(404).json({
                message: "Receiver not found"
            });
        }

        const newMsg = await Msg.create({

            senderId,

            receiId: id,

            message: msg
        });

        user.messages.push(newMsg._id);

        resUser.messages.push(newMsg._id);

        // optional add chat users
        if (
            !user.msgUsers.includes(id)
        ) {

            user.msgUsers.push(id);
        }

        if (
            !resUser.msgUsers.includes(
                senderId
            )
        ) {

            resUser.msgUsers.push(senderId);
        }

        await user.save();

        await resUser.save();

        return res.status(200).json({

            success: true,

            data: newMsg
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Server error"
        });
    }
};

export const oldChatUsers = async (
    req,
    res
) => {

    try {

        const userId = req.user._id;

        const user = await User.findById(
            userId
        )
            .populate("msgUsers")
            .populate("following");

        if (!user) {

            return res.status(404).json({
                message: "user not found"
            });
        }

        if (
            user.msgUsers &&
            user.msgUsers.length > 0
        ) {

            return res.status(200).json({

                success: true,

                users: user.msgUsers
            });
        }

        return res.status(200).json({

            success: true,

            users: user.following
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "internal server error"
        });
    }
};

export const getChats = async (req,res)=>{
    try {
        const {id} = req.params
        const userId = req.user._id
        const msgs = await Msg.find({
                $or: [

                    {
                        senderId: userId,
                        receiId: id,
                    },

                    {
                        senderId: id,
                        receiId: userId
                    },

                ],

            }).sort({
                createdAt: 1
            }).populate("receiId");

        return res.status(200).json({
            msgs
        });

    } catch (error) {
                console.log(error);

        return res.status(500).json({

            success: false,

            message: "internal server error"
        });
    }
}