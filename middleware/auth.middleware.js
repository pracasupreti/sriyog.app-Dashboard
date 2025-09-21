import User from "../model/user.model.js";
import jwt from "jsonwebtoken";


// export const protectRoute= async(req ,res, next) =>{


//    try {
//     let accessToken=await req.cookies.accessToken;
//     // if(!accessToken)
//     // {
//     //     return res.status(401).json({success:false,message:"unauthorized: user not found"})
//     // }

//     if (!accessToken && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//       accessToken = req.headers.authorization.split(" ")[1];
//     }

//     try {
//     const decoded= jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET) //decode the token to get the valid user
//     const user=await User.findById(decoded.userId).select("-Password")  //get tthe user witout password
   
//     if(!user){
//         return res.status(401).json({success:false, message:"user not found"})
     
//     }
//     req.user=user;
//     next();

 
//    } catch (error) {

//     if( error.name === "TokenExpiredError"){
//         return res.status(401).json({message: "unauthized - access token expired"})
//      }
//      throw error;
    
//    }
// } catch (error) {

//      console.log("error in protectRoute middleware", error.message);
//     return res.status(401).json({message: "unauthorized -invalid access Token"})
    
//    }



// }


export const protectRoute = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    if (!accessToken && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      accessToken = req.headers.authorization.split(" ")[1];
    }

    if (!accessToken) {
      return res.status(401).json({ success: false, message: "unauthorized: token not found" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-Password");
      if (!user) {
        return res.status(401).json({ success: false, message: "user not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "unauthorized - access token expired" });
      }
      // For all other JWT errors
      return res.status(401).json({ message: "unauthorized - invalid access token" });
    }
  } catch (error) {
    console.log("error in protectRoute middleware", error.message);
    return res.status(401).json({ message: "unauthorized - server error" });
  }
};



export const adminRoute= async(req, res, next) => {
if( req.user && req.user.role === "admin"){
    next();
}
else{
    return res.status(403).json({message : "access denied -admin only"})
}


}