require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const auth = require('./middlewares/index');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const app = express();

const uri = process.env.DB_URI;
mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hi There, Welcome');
});

app.use(authRoutes);
app.use(trackRoutes);

app.listen(3000, () => {
    console.log('listening on PORT 3000');
});












