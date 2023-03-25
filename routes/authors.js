const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

/*
 NOTE: 
 The routes defined in this document must be defined in this order. 
 The reason for this is that it is read from top to bottom matching along the way.
 First it checks which command -> Get, Post etc.
 Then it checks the pathway '/', '/new' etc. 
*/

// All authors Route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        });

    } catch {
        res.redirect('/');
    }

})

// New author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})

// Create author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const newAuthor = await author.save();
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

// Show author
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        const books = await Book.find({ author: author.id }).limit(6).exec();
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    } catch {
        res.redirect('/');

    }
})

// Edit Author
router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.render('authors/edit', { author: author });
    } catch {
        res.redirect('/authors');
    }
})

// Update Author
// Tip : The id in the url is going to be the same as the id in the request parameters. 
router.put('/:id', async (req, res) => {
    let author;

    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.redirect(`/authors/${author.id}`)
    } catch {
        // This check handles if we try to update an author that does not exist. 
        if (author == null) {
            res.redirect('/');
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
            })
        }
    }
})

// Delete Author 
// Never use a 'get' request for deleting data on the website. Google will come and delete all of your data if you do.
router.delete('/:id', async (req, res) => {
    let author;

    try {
        author = await Author.findById(req.params.id);
        const response = await author.deleteOne();
        res.redirect('/authors');
    } catch {
        // This check handles if we try to update an author that does not exist. 
        if (author == null) {
            res.redirect('/');
        } else {
            res.redirect(`/authors/${author.id}`);
        }
    }
})

module.exports = router;