import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema=new mongoose.Schema({
    Photo: {
        type:String,
        default:"https://ui-avatars.com/api/?name=User"
    },
    Fullname:{
        type:String,
        required:[true,"Fullname is required"]
    },
    Password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be at least 6 character"]

    },
    Email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true
    },
    role:{
        type:String,
        enum:["super admin","admin"],
        default:"super admin"
    }
},
{
timestamps:true
})

//use to secure password and validate them during login
userSchema.pre("save", async function (next) {         //middleware function that runs before saving a user to the database
	if (!this.isModified("Password")) return next();      //// If password wasn't changed, skip hashing
  
	try {
		const salt = await bcrypt.genSalt(10);
		this.Password = await bcrypt.hash(this.Password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (Password) { 
	return bcrypt.compare(Password, this.Password);
};

const User=mongoose.model("DashboardUser",userSchema)
export default User;

