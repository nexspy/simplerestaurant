import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moment from 'moment';

// session handlers
import cookieParser from 'cookie-parser';
import sessions from 'express-session';

// import eventRoutes from './routes/events.js';
// import userRoutes from './routes/user.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extetended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extetended: true}));

//session middleware
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.session);
    res.send('Simple Restaurant API : System is live');
});

// app.use('/users', userRoutes);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error.message);
    });

// prevent error on console
mongoose.set('useFindAndModify', false);