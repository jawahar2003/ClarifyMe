const express = require('express');
const Reply = require('../models/reply'); // Assuming you have a Reply model
const Question = require('../models/question'); // Assuming you have a Question model
const User = require('../models/user'); // Assuming you have a User model
const { tokenExtractor, userExtractor } = require('../utils/middleware');

const replyRouter = express.Router();

// GET /replies
replyRouter.get('/', async (req, res) => {
    try {
        const replies = await Reply.find()
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// POST /replies/:questionId
replyRouter.post('/:questionId', tokenExtractor, userExtractor, async (req, res) => {
    const { questionId } = req.params;
    const { body} = req.body;  // parentReplyId is changed
    const userId = req.user.id; // Extracted user ID from userExtractor middleware
   
    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the question\   
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Create a new reply
        const reply = new Reply({
            body,
            author: userId,
            question: questionId,
            // parentReply: parentReplyId || null
        });

        // Save the reply
        await reply.save();

        // if (parentReplyId) {
        //     // If it's a nested reply, add it to the parent reply's replies array
        //     const parentReply = await Reply.findById(parentReplyId);
        //     if (!parentReply) {
        //         return res.status(404).json({ message: 'Parent reply not found' });
        //     }
        //     parentReply.replies.push(reply._id);
        //     await parentReply.save();
        // } else {
        //     // Add the reply to the question's replies array if it's a top-level reply
        //     question.replies.push(reply._id);
        //     await question.save();
        // }
        question.replies.push(reply._id);
        await question.save();
        // Add the reply to the user's replies array
        user.replies.push(reply._id);
        await user.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// DELETE /replies/:replyId
replyRouter.delete('/:replyId', tokenExtractor, userExtractor, async (req, res) => {
    const { replyId } = req.params;
    const userId = req.user.id; // Extracted user ID from userExtractor middleware

    try {
        // Find the reply
        const reply = await Reply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }
      
        
        // Check if the reply belongs to the user
        if (reply.author.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
      
        
        // Find the question
        const question = await Question.findById(reply.question);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
      

        // Remove the reply from the question's replies array
        question.replies = question.replies.filter(id => id.toString() !== replyId);
        await question.save();
       
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
      
        // Remove the reply from the user's replies array
        user.replies = user.replies.filter(id => id.toString() !== replyId);
        await user.save();
      
        // Delete the reply
        await Reply.findByIdAndDelete(replyId);
       

        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


replyRouter.delete('/deleteAll',async (request,response)=>{
    await Reply.deleteMany({}).then(()=>{
        return response.json({action:"All Replies deleted"})
    })
})

module.exports = replyRouter;
