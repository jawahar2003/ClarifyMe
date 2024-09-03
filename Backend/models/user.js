const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User