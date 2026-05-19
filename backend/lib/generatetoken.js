import jwt from 'jsonwebtoken'

export const generateToken =async (uId,res)=>{
    try {
        const token = jwt.sign({uId},process.env.JWT_SECRET,{
            expiresIn :'15d'
        })
        
        res.cookie('jwt',token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "lax", // CSRF attacks cross-site request forgery attacks
		secure: false,
        })
    } catch (error) {
        console.log(error.message)
    }
}