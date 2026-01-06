const User = require("../model/UsersModel");
const { createSecretToken } = require("../Util/SecretToken");

const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, username, password, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, username, password, createdAt });   
        const token = createSecretToken(user.id);
        res.cookie("token", token, {
            httpOnly: true, // hide cookie from JS (good practice)
            sameSite: "lax", // or 'none' if using https and cross-site
            secure: false,  // set to true if using HTTPS
        });
        res.status(201).json({ message: "User signed up successfully", success: true, user });
        next();
    }
    catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next)=> {
    try{
        const {email, password} = req.body();
        if(!email || !password){
            return res.json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({message: "Incorrect email or password"});
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({message: "Incorrect email or password"});
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token,{
            httpOnly: true,  // hide cookie from JS (good practice)
            sameSite: "lax", // or 'none' if using https and cross-site
            secure: false,  // set to true if using HTTPS
        });
        res.status(201).json({message: "User logged in successfully", success: true});
        next();
    }catch(error){
        console.error(error);
    }
};

// module.exports.Signup = (req, res) => {
//   console.log("HEADERS:", req.headers);
//   console.log("BODY:", req.body);

//   if (!req.body) {
//     return res.status(400).json({ message: "Request body is missing" });
//   }

//   const { email, password } = req.body;
//   res.json({ email, password });
// };
