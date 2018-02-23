const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//Connect to Mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Load IDEA Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body-oarser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/',(req, res) => {
    const title = 'Miau';
    res.render('index', {
        title: title
    });
});

app.get('/About', (req, res) => {
    res.render('About');
});
//Formulario de agregar
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

// Post de Formulario de Idea
app.post('/ideas', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({text:'Please add a Title'});
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add Details' });
    }
    if(errors.length>0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        res.send('passed');
    }
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});