require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/route');

const MONGO_URI = process.env.MONGO_URI;
const app = express();

//form-data
app.use(express.urlencoded({ extended: false }));

//json
app.use(express.json({ extended: false }));
app.use(cors());


mongoose.connect(MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/' , (req , res) => {
    res.send('Server Live')
})

app.use('/api' , routes);

app.listen(process.env.PORT || 3002 , () => {
    console.log('Server Is Live')
});

