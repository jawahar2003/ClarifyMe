const errorHandler = (error, request, response, next) =>{
    console.log(error.code)

    if(error.name == "MongoServerError") // for 
        return response.status(409).json({error: error.message})
    else if(error.code === "EAUTH")
        return response.status(500).json({error: error.message})
}

module.exports = errorHandler

