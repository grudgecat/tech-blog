//not post like POST but post like blog post
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');
const { Comment } = require('../../models');
const { User } = require('../../models');

//create a comment
router.post('/', withAuth, async (req, res) => {

    try {
        req.body.user_id=req.session.user_id;
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        
        const commentData = await Comment.destroy({ 
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json( {message: 'You can only delete comments that you have posted.'} );
            return;
        }
        return(200).json( {message: "Comment has been deleted."} );
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;