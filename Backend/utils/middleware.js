const errorHandler = (error, request, response, next) =>{
    console.log(error.message)
    if(error.name = "MongoServerError") 
        return response.status(409).json({error: error.message})
}

module.exports = errorHandler

