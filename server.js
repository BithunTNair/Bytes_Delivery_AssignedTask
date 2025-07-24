const express = require('express');
require('dotenv').config();
const DB = require('./config/db');

const app = express();
DB();
const PORT = process.env.PORT;
const URLRouter = require('./routes/urlRoute')

app.use(express.json());


app.use('/api', URLRouter);




app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);

})