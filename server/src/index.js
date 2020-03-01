const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const logs = require('./api/logs')
require('dotenv').config();


const middleware = require('./middleware')
const app = express();

console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
});

app.use('/api/logs', logs)

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});