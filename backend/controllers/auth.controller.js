import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
import {redis} from "../lib/redis.js"



const generateToken=(userId)=>{ //The userId parameter is used to identify the user in the JWT tokens.
  const accessToken=jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"60s"
  })

  const refreshToken=jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:"7d",
  })

  return {accessToken,refreshToken}
}


const storeRefreshToken=async(userId,refreshToken)=>{
  await redis.set(`refresh_token:${userId}`,refreshToken,"Ex",15*60*60*1000)
}

  const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV=="production",
      sameSite:process.env.NODE_ENV=="production"? "strict":"lax", // "strict" for production, "lax" for development
      maxAge: 3 * 60 * 60 * 1000 
    })
    res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV=="production",
      sameSite:process.env.NODE_ENV=="production"? "strict":"lax", // "strict" for production, "lax" for development
      maxAge:7*24*60*60*1000
    })
  }


export const SignUp = async (req, res) => {

  const { Photo,Fullname, Email, Password } = req.body;
  try {
    if (!Fullname || !Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are requied" });
    }

    const userExist = await User.findOne({ Email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, messsage: " User already Exists" });
    }
    const user = await User.create({Photo,Fullname, Email, Password });

    const { accessToken, refreshToken } = generateToken(user._id);  //This function creates JWT tokens (usually one short-lived access token and one long-lived refresh token).
    // await storeRefreshToken(user._id, refreshToken);  //only if we want to store the token in redis
        await storeRefreshToken(user._id,refreshToken)
        setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      success:true,
      accessToken,
      refreshToken,
      user:{
      _id: user._id,
      Photo: user.Photo,
      Fullname: user.Fullname,
      Password: user.Password,
      Email: user.Email,
    role: user.role}
    });
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(401)
        .json({ success: false, message: "All field are required" });
    }
    const user = await User.findOne({ Email });
    if (user && (await user.comparePassword(Password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      res.status(200).json({
        success:true,
        accessToken,
      refreshToken,
      user:{
        _id: user._id,
        Email: user.Email,
        Password: user._Password,
        role: user.role,
        Fullname: user.Fullname,
        Photo: user.Photo,
        role: user.role
      }
      });
    } else {
      res.status(400).json({success:false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const Logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile=async(req,res)=>{
    try{
        // res.json(req.user)

    const userId = req.user._id; // from your auth middleware
    const user = await User.findById(userId).select("-Password");
    res.json( user );
    }catch(err){
        console.log('Error in getProfile Controller',err.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}


// export const updateProfile=async(req,res)=>{
//   try{
//     const userId=req.user._id;
//     const {userName,userProfileImg,bio,currentPassword,newPassword}=req.body;
//     if(!userName && !userProfileImg && !bio && !currentPassword && !newPassword ){
//       res.status(400).json({error:"atleast one field required"});
//       return;
//     }
//     let cloudinaryResponse=null;
//     const user=await User.findById(userId);
//     if(!user){
//       res.status(400).json({error:"user not found"});
//       return;
//     }
   
//     if(newPassword && newPassword.length<6 && newPassword.length>12){
//       res.status(400).json({error:"Password should be between 6 to 12 characters"});
//       return
//     }
//     if(newPassword && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(newPassword)===false){
//       res.status(400).json({error:"Password should contain atleast one uppercase letter,one lowercase letter,one special character and one number"});
//       return
//     }
//     if(currentPassword || newPassword){
//         const validPassword=await bcrypt.compare(currentPassword,user.Password);
//         console.log(currentPassword,user.Password)
//         console.log(validPassword)
//         if(!validPassword){
//           res.status(400).json({error:"Invalid Password"});
//           return;
//         }
//         // const salt=await bcrypt.genSalt(10);
//         // const newHashedPassword=await bcrypt.hash(newPassword,salt);
//         // console.log(newHashedPassword)
//         // user.Password=newHashedPassword;
//       }
//       if(userProfileImg){
//         try{
//           if(user.Photo){
//           const publicId=user.Photo.split('/').pop().split('.')[0];
//             await cloudinary.uploader.destroy(`ProfilePictures/${publicId}`);
//           }
//             cloudinaryResponse= await cloudinary.uploader.upload(userProfileImg,{folder:'ProfilePictures', 
//   transformation: [
//     { quality: "auto" }
//   ]
//         });
//         }catch(err){
//             console.log('errror checking image in cloudinary',err.message);
//         }
//       }

//       user.Fullname=userName || user.Fullname;
//     user.Photo=cloudinaryResponse?.secure_url || user.Photo;
//     user.Email=user.Email
//     user.Password=newPassword || user.Password;
//     await user.save();
//     const data=user._doc;
//     delete data.password;
//     res.status(200).json({message:"profile updated successfully",user:data});

//   }catch(error){
//     if (error.name === 'ValidationError') {
//       const errorMessages = Object.values(error.errors).map(val => val.message);
      
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errorMessages
//       });
//     }
//     console.log("error in updateProfile controller",error);
//     res.status(500).json({error:"internal server error"});
//   }}

export const refreshToken = async (req, res) => {
    console.log('hi i ma here')
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge:  2*60*60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

