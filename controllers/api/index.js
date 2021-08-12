const router = require('express').Router();
const postsRoutes = require('./postRoutes');
router.use('/posts', postsRoutes );


module.exports = router;