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

app.get('/chainreaction/:id/new', (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) =>{
        res.render('reViews/new.ejs', {
            item: req.query.items,
            chain: foundChain
        });
    });
});

//Delete
app.delete('/chainreaction/:id', (req, res) => {
    Chain.findByIdAndDelete(req.params.id, (error, deletedChain) => {
        res.redirect('/chainreaction')
    })
})

// Update
app.put('/chainreaction/:id', (req, res) => {
    Chain.findByIdAndUpdate(req.params.id , req.body,
        {new: true},
        function (error, updatedChain) {
            res.redirect(`/chainreaction/${req.params.id}`);
        }
    )
})

// Create
app.post('/chainreaction', (req, res) => {
    Chain.create(req.body, (error, createdChain) => {
        res.redirect('/chainreaction')
    });
});

app.post(`/chainreaction/:id`, (req, res) => {
    Chain.create(req.body, (error, createdPost) => {
        res.redirect(`/chainreaction/${req.params.id}?items=${req.query.items}`)
    })  
})   

// Edit
app.get("/chainreaction/:id/edit", (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render('edit.ejs', {
            chain: foundChain,
        })
    })
})

app.get("/chainreaction/:id/postedit", (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render('reViews/edit.ejs', {
            chain: foundChain,
            item: req.query.items,
        })
    })
} )

// Show
app.get('/chainreaction/:id', (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render('show.ejs', {
            chain: foundChain,
            item: req.query.items,
        })
    })
})


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

