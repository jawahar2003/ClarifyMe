const userRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')
const OTP = require('../models/otpModel');
const bcrypt = require('bcrypt')
const mailSender = require('../utils/mailSender')
const otpGenerator = require('otp-generator');


//fetch all user details
userRouter.get('/getall',async (request,response)=>{
    const users = await User.find({})
    return response.json(users);
})

//creating user
userRouter.post('/register',async (request,response,next)=>{


       
            const {username, email, password} = request.body

        // Check for existing verified user with the same username or email
        const existingVerifiedUser = await User.findOne({
            $or: [{ username }, { email }],
            isVerified: true,
        });
  
        if (existingVerifiedUser) {
            return response.status(400).json({
            message: 'Username or email already in use by a verified account. Please choose a different one.',
         });
        }

        if(password.length<8) return response.status(400).json({error: "password length should be greater than 8"})
        
        const emailPattern = /^[a-zA-Z0-9]+@srmist\.edu\.in$/;
        const isValidEmail = emailPattern.test(email)

        const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValidPassword = passwordPattern.test(password)
        console.log(`Email:${isValidEmail}`)
        console.log(`pass:${isValidPassword}`)

        if(!isValidEmail) return response.status(400).send("not a valid email")
        if(!isValidPassword) return response.status(400).json({error: "Invalid password. It must contain at least one uppercase letter, one special character, and be at least 8 characters long."})
        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            email,
            passwordHash
        })
        
        const savedUser = await user.save()
        // Generate OTP
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        // Save OTP to the database
        const otpEntry = new OTP({ email: user.email, otp });
        const savedOtp = await otpEntry.save();
        console.log(savedOtp)
        response.status(200).json({ message: 'OTP sent to your email. Please verify your account.' });
        console.log(savedUser)
        //response.status(201).json(savedUser)
       
   
        
    })
    
    
    //delete all users
    userRouter.delete('/deleteAll',async (request,response)=>{
        await User.deleteMany({}).then(()=>{
            return response.json({action:"All users deleted"})
        })
    })

    userRouter.post('/verifyotp', async (req, res) => {
        
            const { email, otp } = req.body;
          
            // If OTP is valid, update user's isVerified status
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'User not found' });

            // Find the OTP entry
            const otpEntry = await OTP.findOne({ email, otp });
            if (!otpEntry) return res.status(400).json({ message: 'Invalid or expired OTP' });

            // Check for existing verified users with the same username or email
            const existingVerifiedUser = await User.findOne({
             $or: [{ username: user.username }, { email: user.email }],
            isVerified: true
            });
  
        if (existingVerifiedUser) {
            // If a verified user with the same username or email exists, deny verification
            return res.status(400).json({
            message: 'Username or email already in use by another verified account. Please choose a different one.'
            });
        }
          
            user.isVerified = true;
            await user.save();
          
            // Delete the OTP entry after verification
            await OTP.findByIdAndDelete(otpEntry._id);
          
            res.status(200).json({ message: 'Email verified successfully' });
         
        });
    

module.exports = userRouter