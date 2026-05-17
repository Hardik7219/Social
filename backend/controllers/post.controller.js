import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createPost = async (req,res)=>{
    try {
        const {title,details} = req.body;
        console.log(title);
        
        const newPost = await Post.create({
            userId:req.user._id,
            title:title,
            details:details
        })
        res.json({status:200,message:'post created'});
    } catch (error) {
        console.log(error);
        return res.json({status:500,message:'internal server error'});
        
    }
}

export const likePost = async (req,res)=>{
    try {
        const {postId} = req.params;        
        const likedPost= await  Post.findById(postId);
        const id= req.user._id;
        const like=await likedPost.likes.includes(id)
        if(like)
        {
            await Post.findByIdAndUpdate(likedPost._id,{$pull:{likes:id}})
            return res.json({status:200,message:'unlike the posts'})
        }
        else
        {
            await Post.findByIdAndUpdate(likedPost._id,{$push:{likes:id}})
            return res.json({status:200,message:'like the posts'})

        }

    } catch (error) {
        console.log(error);
        return res.json({status:500,message:'internal server error'})
        
    }
}


export const commentPost = async (req,res)=>{
    try {
        const {comment} = req.body;
        const {postId} = req.params;
        const userId= req.user._id;

        const post = await Post.findById(postId)
        if(!text) return res.json({status:201,message:'comment is empty'})
        

        const COMMENT={text:comment,userComment:userId}
        post.comments.push(COMMENT)
        await post.save()
        return res.json({status:200,post})
    } catch (error) {
        console.log(error);
        return res.json({status:500,message:'internal server error'})
    }
}