// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Chain = require('./models/chains.js')
const chainSeed = require('./models/chainSeed.js')

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

// Database Configuration
mongoose.connect(process.env.DATABASE_URL);

// Seed
app.get('/seed', (req, res) => {
    Chain.deleteMany({}, (error, allChains) => {});

    Chain.create(chainSeed, (error, data) => {
            res.redirect('/chainreaction/')
    })
})

// Index Route
app.get('/', (req, res) => {
    Chain.find({}, (error, allChains) => {
        res.render('index.ejs', {
            chains: allChains,
            search: req.query.search
        });
    });
});

// New
app.get('/chainreaction/newchain', (req, res) => {
    res.render('new.ejs')
})

//Delete
app.delete('/chainreaction/:id', (req, res) => {
    Chain.findByIdAndDelete(req.params.id, (error, deletedChain) => {
        res.redirect('/')
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
        res.redirect('/')
    });
});
 

// Edit
app.get("/chainreaction/:id/edit", (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render('edit.ejs', {
            chain: foundChain,
        })
    })
})


// Show
app.get('/chainreaction/:id', (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render('show.ejs', {
            chain: foundChain,
            menu: req.query.items,
        })
    })
})


///////REACTION ROUTERS


// New
app.get('/chainreaction/:id/new', (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) =>{
        res.render('reViews/new.ejs', {
            menu: req.query.items,
            chain: foundChain
        });
    });
});

//Delete

//Update
app.put(`/chainreaction/:id`, (req, res) => {
    Chain.findByIdAndUpdate(req.body,
        {new: true},
        function (error, updatedChain) {
            res.redirect(`/chainreaction/${req.params.id}/?items=${req.query.items}`);
        }
    )
})

// Create
app.post('/chainreaction/:id', (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        foundChain.reaction.push(req.body);
        console.log(req.body)
        foundChain.save(function(err) {
            console.log(foundChain)
            res.redirect(`/chainreaction/${req.params.id}`)
        })
    })  
})  

// Edit
app.get("/chainreaction/:id/postedit", (req, res) => {
    Chain.findById(req.params.id, (error, foundChain) => {
        res.render('reViews/edit.ejs', {
            chain: foundChain,
            menu: req.query.items,
        })
    })
})

// Show 


app.use(express.static('public'));

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

