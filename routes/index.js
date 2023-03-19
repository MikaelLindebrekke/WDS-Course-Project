const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Root of our application - '/' = localhost:3000. 
router.get('/', async (req, res) => {
    let books;
    try {
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();
    } catch {
        books = [];
    }
    res.render('index', { books: books });
})

// Exports this file. 
// Tells the rest of the application about the routes defined
module.exports = router;