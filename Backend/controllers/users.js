const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


//fetch all user details
userRouter.get('/getall',async (request,response)=>{
    const users = await User.find({})
    return response.json(users);
})

//creating user
userRouter.post('/register',async (request,response,next)=>{


       
            const {username, email, password} = request.body

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
        response.status(201).json(savedUser)
       
   
        
    })
    
    
    //delete all users
    userRouter.delete('/deleteAll',async (request,response)=>{
        await User.deleteMany({}).then(()=>{
            return response.json({action:"All users deleted"})
        })
    })


module.exports = userRouter