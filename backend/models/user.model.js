import mongoose, { Mongoose, Types } from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: [],
    }],
    bio: {
        type: String
    }
}, { timestamps: true })

const User=mongoose.model('User', userSchema);
export default User;