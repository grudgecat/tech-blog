const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postsRoutes = require('./postRoutes');

router.use('/posts', postsRoutes );
router.use('/users', userRoutes);


module.exports = router;