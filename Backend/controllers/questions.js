const express = require('express')
const tokenExtractor = require('../utils/middleware').tokenExtractor
const userExtractor = require('../utils/middleware').userExtractor
const Question = require('../models/question')
const User = require('../models/user')


const questionRouter = express.Router();

// Fetch all questions
questionRouter.get('/all', async (req, res) => {
    try {
        const questions = await Question.find().populate({
            path: 'replies',
            options: { limit: 5 },  // Limits top-level replies
            populate: {
                path: 'replies',  // Populate the replies of replies (nested replies)
                populate: {
                    path: 'replies',  // This is to populate even further levels of replies
                },
            },
        })
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

// Post a new question
questionRouter.post('/question',tokenExtractor,userExtractor, async (req, res) => {
   
        const user = await User.findById(req.user.id);
        const { title, body } = req.body
        const newQuestion = new Question({
            title,
            body,
            author: user.id // Assuming the token middleware attaches user info to req.user
        });

     
        
        const savedQuestion = await newQuestion.save()
        user.questions = user.questions.concat(savedQuestion._id)
        await user.save()
        res.status(201).json(savedQuestion)
    
});

// Delete a question
questionRouter.delete('/question/:id', tokenExtractor, userExtractor, async (req, res) => {
    try {
        const questionId = req.params.id;
        const user = await User.findById(req.user.id);

        // Find the question by ID
        const question = await Question.findById(questionId);
        
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Check if the user is the owner of the question
        if (question.author.toString() !== user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Delete the question
        await Question.findByIdAndDelete(questionId);

        // Remove the question reference from the user's questions array
        user.questions = user.questions.filter(qId => qId.toString() !== questionId);
        await user.save();

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error });
    }
});



module.exports = questionRouter;