const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) =>{
    console.log(error)
   

    if(error.name === "MongoServerError") // for 
        return response.status(409).json({error: error.message})
    else if(error.code === "EAUTH")
        return response.status(500).json({error: error.message})
    else if(error.name === "ValidationError"){
        return response.status(400).json({error: error.message})
    }

    
}


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token =  authorization.replace('Bearer ','')
        console.log("token:",request.token)
    } else {
        request.token = null
    }
    //console.log(request.token) 
    next()
}

const userExtractor = (request, response, next) =>{
    request.user = jwt.verify(request.token, process.env.SECRET)
    //console.log(request.user)
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}

