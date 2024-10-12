const errorHandler = (error, request, response, next) =>{
    console.log(error.code)

    if(error.name == "MongoServerError") // for 
        return response.status(409).json({error: error.message})
    else if(error.code === "EAUTH")
        return response.status(500).json({error: error.message})

    next(next)
}


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token =  authorization.replace('Bearer ','')
    } else {
        request.token = null
    }
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}

