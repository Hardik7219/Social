import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        text: {
            type: String
        },
        userComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }],
    type: {
        type: String,
        enum: ["normal","code"],
        default: "text"
    },
    img: {
        type: String,
    },
    imgPublicId: {
        type: String
    }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export default Post;