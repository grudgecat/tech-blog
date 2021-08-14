//not post like POST but post like blog post
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');
const { Comment } = require('../../models');
const { User } = require('../../models');


//  /create new post
router.post('/dashboard', withAuth, async (req, res) => {
    // try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    // }
    // catch (err) {
    //     res.status(400).json(err);
    // }
});

router.delete('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({ 
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json( {message: 'No post found with this ID'} );
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;