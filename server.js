const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// set up express app
const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

// handle deprecations
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// flag
// app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api',routes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}
// error handling middleware
app.use(function(err, req, res, next){
    // console.log(err);
    res.status(422).send({error: err.message})
});

// listen for requests
//port or PORT
app.listen(process.env.PORT || 4000 , function() {
    console.log('now listening for requests');
});