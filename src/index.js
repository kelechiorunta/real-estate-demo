const express = require('express');
const async_hooks = require('async_hooks');
const { AsyncLocalStorage } = async_hooks;
const events = require('events');
const path = require('path');
const cors = require('cors');
const os = require('node:os');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apis = require('./backend/routes/routes');
const oauth = require('./backend/routes/oauth');
const { checkToken } = require('./backend/middleware');
const { connectDB } = require('./backend/mongodb');
require('dotenv').config();

//Connect to the database
connectDB();

//Error handling class inherited from the node Error Class
class ServerError extends Error {
    constructor(message, cause = null, statusCode = 500) {
        super(message);
        this.cause = cause;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const emitter = new events.EventEmitter();
const app = express();
const PORT = process.env.PORT ?? 5501;
const HOST = process.env.HOST ?? 'localhost';

const storage = new AsyncLocalStorage();
let idStorage = 0;

// Set up EJS and static files
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'dist')));

//Middleware to parse formdata
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// CORS setup
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [`http://${HOST}:${PORT}`, 'https://oauth2.googleapis.com/token'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            return callback(null, true);
        } else {
            return callback(new ServerError("Not an allowed domain", null, 403));
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

// Middleware for handling storage and events
app.use((req, res, next) => {
    try {
        const currenttime = new Date();
        storage.run(idStorage++, () => {
            emitter.emit('greet');
            req.time = currenttime;
            if (req.cookies.kus) {
                console.log("Cookie Kus exists")
            }else{
                console.log("Cookie Kus expired")
            }
            console.log(req.user)
            next();
        });
    } catch (err) {
        next(new ServerError("Failed during request processing", err.message));
    }
});

//Middleware for loading imported route modules
app.use('/api', apis);
app.use('/api/auth', oauth);

// Catch-all route
app.get('*', async (req, res, next) => {
    try {
        console.log(`The current time is ${req.time}`);
        const indexfile = path.resolve(__dirname, 'dist/index.html')
        res.sendFile(indexfile)
        // res.render('index', {
        //     content: `Loading...${new Date()}`
        // });
    } catch (err) {
        next(new ServerError("Failed to render index", err.message));
    }
});

// Error middleware
app.use((err, req, res, next) => {
    if (err instanceof ServerError) {
        console.error(`ServerError: ${err.message}\nCause: ${err.cause}\nStack: ${err.stack}`);
        res.status(err.statusCode).json({
            error: err.message,
            cause: err.cause,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    } else {
        console.error(`Unexpected Error: ${err.message}\nStack: ${err.stack}`);
        res.status(500).json({
            error: "An unexpected error occurred.",
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`, `\nMemory available is ${os.freemem() / 1024 / 1024}`);
});
