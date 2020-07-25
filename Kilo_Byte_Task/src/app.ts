import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import {MONGODB_URI, SESSION_SECRET} from "./util/secrets";
import cors from "cors";
import morgan from "morgan";
import helmet from 'helmet'
import mongoose from "mongoose";
import _ from 'lodash'
import checkTokenAuth from './util/checkTokenAuth'
import authRoutes from "./app/api/routes";


const app = express();

//custom helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
        }
    },
    referrerPolicy: {
        policy: 'same-origin'
    }
}))

const rejectFolders = [
    "css",
    "bower_components",
    "js",
    "img",
    "fonts",
    "images"
];

// removing static resources from the logger
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
        skip: req => rejectFolders.indexOf(req.url.split("/")[1]) !== -1
    })
);


mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(
        () => {
            console.log('MongoDB Connected!')
        },
    )
    .catch(err => {
        console.log("MongoDB connection error . Please make sure MongoDB is running. " + err);
        // process.exit();
    });

mongoose.set("debug", false);

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 1000000})); // experiment with this parameter and tweak

app.use(cors());

app.set("port", process.env.PORT);

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));
app.use('/', checkTokenAuth)
authRoutes(app)

export default app;
