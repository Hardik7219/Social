import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    title: {
        type: String
    },
    details: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    comments: [{
        text:{
            type:String
        },
        userComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }
    }],
}, { timeseries: true })

const Post = mongoose.model('Post', postSchema)

export default Post;