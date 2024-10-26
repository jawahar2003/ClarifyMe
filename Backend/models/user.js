const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isVerified : {type : Boolean,default: false},
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000; // UTC+5:30
            return new Date(now.getTime() + istOffset);
        },
    },
});

userSchema.set('toJSON',{
    transform: (document, returnedObject) =>{   //changed here
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
