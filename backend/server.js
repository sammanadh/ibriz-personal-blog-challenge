const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    console.log("UNCAUGHT EXCEPTION: ");
    console.log(`${err}`);
    process.exit(1);
})

dotenv.config({ path: `${__dirname}/config.env` });

let db = '';
if (process.env.NODE_ENV === 'production') {
    db = process.env.DATABASE_PROD;
} else if (process.env.NODE_ENV === 'development') {
    db = process.env.DATABASE_DEV;
}

//Connecting to database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (err) {
            if (process.env.NODE_ENV == 'development') {
                console.log(err);
            } else {
                console.log("SORRY! DATABASE CONNECTION FAILED");
            }
            process.exit(1);
        }
        console.log("Database connected successfully!")
    })

//Requiring application
const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
    console.log(`Listening to port ${port}...🙂`);
})

process.on("unhandledRejection", err => {
    if (process.env.NODE_ENV = "development") {
        console.log(err)
    } else {
        console.log("UNHANDLED PROMISE REJECTION: ")
        console.log(`${err.name}: ${err.message}`);
    }
    server.close(() => {
        process.exit(1);
    });
})
