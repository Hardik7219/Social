import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String
    },
    details: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        text:{
            type:String
        },
        userComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }],
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export default Post;