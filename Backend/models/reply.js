const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    parentReply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        default: null,  // For top-level replies
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
