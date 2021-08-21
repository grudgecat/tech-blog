//not post like POST but post like blog post
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');
const { Comment } = require('../../models');
const { User } = require('../../models');


//get all posts
router.get('/', withAuth, async (req, res) => {
  const postData = await Post.findAll({
      include: [
        {
          model: Comment,
        }
      ]
    });

    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });
    res.json(posts);
});



// create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//edit post
router.put('/:id', withAuth, async (req, res) => {
    // try {
        const newPost = await Post.update({
            ...req.body,
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(newPost);
    // }
    // catch (err) {
    //     res.status(400).json(err);
    // }
});

//delete post, only poster can delete their own posts
router.delete('/:id', withAuth, async (req, res) => {
    // try {
        const postData = await Post.destroy({ 
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json( {message: 'No post found with this ID, or permission denied.'} );
            return;
        }
        res.status(200).json( {message: "Post has been deleted."} );
    // }
    // catch (err) {
    //     res.status(500).json(err);
    // }
});



module.exports = router;