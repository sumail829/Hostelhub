import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    const token=req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(403).json({ message: "Access denied. No token provided." });
    }
    
    jwt.verify(token,"123124asdajsbdahjsbdajsb123",(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Invalid or expired token"});
        }

        req.user=decoded;
        next();
    })


}