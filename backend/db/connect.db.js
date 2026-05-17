import mongoose from "mongoose";


const connectionDB = async()=>{
    try {
        const dbUrl = process.env.MONGODB_URL
        const conn= await mongoose.connect(dbUrl)
        if(conn) console.log('db is connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}


export default connectionDB;