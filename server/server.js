require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/route');
const app = express();
const server = require("http").createServer(app);
const path = require('path');

const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin: 'https://url-shortener-twin.vercel.app'
  }));
//form-data
app.use(express.urlencoded({ extended: false }));

//json
app.use(express.json({ extended: false }));


app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", async () => {
    console.log("connected to mongo ");
  });
  mongoose.connection.on("error", async (err) => {
    console.log("error connecting", err);
  });


app.use('/api' , routes);

app.get('/' , (req , res) => {
    res.send('Server Live')
})

server.listen(process.env.PORT || 3002 , () => {
    console.log('Server Is Live')
});

