const express = require('express');
const cors = require('cors');

//Global Error Hanlder
const errorHandler = require('./utils/errorHandler');

const { ArticleRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

const BASE_API_ROUTE = '/api/v1'
app.use(`${BASE_API_ROUTE}/articles`, ArticleRouter);

app.use('/static', express.static(`${__dirname}/static`));

app.use("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Not found"
    })
})

app.use(errorHandler);

module.exports = app;