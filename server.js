// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Chain = require('./models/chains.js')

// Middleware
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

// Database Configuration
mongoose.connect(process.env.DATABASE_URL);

// Index Route
app.get('/chainreaction', (req, res) => {
    Chain.find({}, (error, allChains) => {
        res.render('index.ejs', {
            chains: allChains,
        });
    });
});

// New
app.get('/chainreaction/newchain', (req, res) => {
    res.render('new.ejs')
})

// Delete
app.delete('/chainreaction/:id', (req, res) => {
    Chain.findByIdAndDelete(req.params.id, (error, deletedChain) => {
        res.redirect('/chainreaction')
    })
})

// Update
app.put('/chainreaction/:id', (req, res) => {
    Chain.findByIdAndUpdate( 
        req.params.id,
        req.body,
        { new: true},
        (error, updatedChain) => {
            res.send(updatedChain);
        }
    )
})

// Create
app.post('/chainreaction', (req, res) => {
    if (req.body.breakfast === 'on') {
        req.body.breakfast = true;
    } else if (req.body.dessert === 'on') {
        req.body.dessert = true;
    } else if (req.body.drinks === 'on') {
        req.body.drinks = true;
    } else if (req.body.breakfast === 'off') {
        req.body.breakfast = false;
    } else if (req.body.dessert === 'off') {
        req.body.dessert = false;
    } else if (req.body.drinks === 'off') {
        req.body.drinks = false;
    }
    Chain.create(req.body, (error, createdChain) => {
        res.redirect('/chainreaction')
    });
});

// Edit

// Show
app.get('/chainreaction/:id', (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render("show.ejs");
    });
});

// Databse Connection Error/ Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Listener
const PORT=process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`)
});

