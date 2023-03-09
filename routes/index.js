const express = require('express');
const router = express.Router();

// Root of our application - '/' = localhost:3000. 
router.get('/', (req, res) => {
    res.render('index');
})

// Exports this file. 
// Tells the rest of the application about the routes defined
module.exports = router;