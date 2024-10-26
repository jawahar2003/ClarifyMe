const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
