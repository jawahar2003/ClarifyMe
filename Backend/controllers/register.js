const registrationRouter = require('express').Router()


registrationRouter.get('/',(request,response)=>{
    return response.json("registration page");
})

registrationRouter.post('/',(request,response)=>{
    const name = request.body.name
    console.log(request.body)
    return response.json(`${name} is stored in to DB`)
})

module.exports = registrationRouter