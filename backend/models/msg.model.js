import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        senderId :{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        receiId :{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        message : {
            type:String
        }
    },
    {
            timestamps: true
        }
)

const Msg = mongoose.model('Msg', msgSchema)

export default Msg;