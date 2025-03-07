import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

userSchema.statics.signup = async function(email, password) {

    if(!email ||!password){
        throw new Error("Please provide email and password")
    }

    if(!validator.isEmail(email)){
        throw new Error("Invalid email")
    }

    if(password.length < 8){
        throw new Error("Password should be at least 8 characters long")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    }

    const exists = await this.findOne({ email})

    if(exists){
        throw new Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({email, password: hash})

    return user
}

export const User =  mongoose.model("User", userSchema);