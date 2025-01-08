import usermodel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator";

// login
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        // find email
        const user = await usermodel.findOne({email});
        if(!user){
            return res.json({success: false, message : "User Not Found!"})
        }

        // mathcing passsword
        const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message : "Wrong Password!"})
        }

        const token = createToken(user._id);
        return res.json({success: true, token})
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Something went wrong! in userController.js"})
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register
const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try{
        // checking if user already exists
        const exists = await usermodel.findOne({email});
        if(exists){
            return res.json({success: false, message: "User already exists!"})
        }

        // valid email checking
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Not a valid email!"})
        }
        
        // strong password checking
        if(password.length < 8){
            return res.json({success: false, message: "Password length must be at least 8!"})
        }

        // password encryption
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new usermodel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success: true, token})
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Something went wrong! in userController.js"})
    }
}

export {loginUser, registerUser};