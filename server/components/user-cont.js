const User=require('../models/user_model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cryptro=require('crypto');
const nodemailer=require('nodemailer');




const registerUser=async(req,res)=>{
    try{
        const {name,email,password,role,specialty,servicesOffered,phoneNumber}=req.body;  
        // check the user already exists 
        let existUser=await User.findOne({email:email});
        if(existUser){
            return res.status(400).json({msg:'User already exists'})
        }

        //Created new Users instance 
        const user=new User({name,
            email,
            password,
            role:role||patient,
            specialty,
            servicesOffered,
            phoneNumber,
            // tokenExpiry:user.tokenExpiry
        });
        // console.log("creating user")
        const token=cryptro.randomBytes(20).toString('hex');
        user.verificationToken=token;
        user.tokenExpiry=Date.now()+3600000; // 1 hour
        await user.save();

        
    // // send email
    // const transporter = nodemailer.createTransport({
    //   host: process.env.MAILTRAP_HOST,
    //   port: process.env.MAILTRAP_PORT,
    //   secure: false, // true for port 465, false for other ports
    //   auth: {
    //     user: process.env.MAILTRAP_USERNAME,
    //     pass: process.env.MAILTRAP_PASSWORD,
    //   },
    // });

    // const mailOption = {
    //   from: process.env.MAILTRAP_SENDEREMAIL,
    //   to: user.email,
    //   subject: "Verify your email", // Subject line
    //   text: `Please click on the following link:
    //   ${process.env.BASE_URL}/api/v1/users/verify/${token}
    //   `,
    // };

    // await transporter.sendMail(mailOption);


    res.status(201).json({message:'User registered successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
const verifyEmail=async(req,res)=>{
    try{
        const {token}=req.params;
        console.log(token);
        if(!token){
            return res.status(400).json({msg:'No token provided'});
        }

        const user=await User.findOne({verificationToken:token});
        if(!user){
            return res.status(400).json({msg:'Invalid token'});
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        user.tokenExpiry=undefined;

        await user.save();

        res.status(200).json({msg:'Email verified successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //

    const token = jwt.sign(
      { id: user._id, role: user.role },

      "shhhhh",
      {
        expiresIn: "24h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}
const profile=async(req,res)=>{}

module.exports={registerUser,verifyEmail,login,profile}