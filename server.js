if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Defines the routes that should be available on the server. 
// Imports the index file from the routes folder. 
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const demoRouter = require('./routes/demo');

app.set('view engine', 'ejs');

// Decides where our views are coming from. See folder. 
app.set('views', __dirname + '/views');

// Creates a common layout file so that we dont have to duplicate the beginning and ending of our HTML files. 
app.set('layout', 'layouts/layout');

app.use(expressLayouts);

// Designates where the public files are going to go such as style sheets, javascript, images etc. 
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride('_method'));

// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/demo', demoRouter);

// Starts the server. 
// First part is for when it is deployed but for development we just use 3000. 
app.listen(process.env.PORT || 3000);