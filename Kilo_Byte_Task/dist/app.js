"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const secrets_1 = require("./util/secrets");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkTokenAuth_1 = __importDefault(require("./util/checkTokenAuth"));
// Controllers (route handlers)
// import {config} from './config/settings'
const routes_1 = __importDefault(require("./app/api/routes"));
const app = express_1.default();
//custom helmet
app.use(helmet_1.default({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
        }
    },
    referrerPolicy: {
        policy: 'same-origin'
    }
}));
const rejectFolders = [
    "css",
    "bower_components",
    "js",
    "img",
    "fonts",
    "images"
];
// removing static resources from the logger
app.use(morgan_1.default(":method :url :status :res[content-length] - :response-time ms", {
    skip: req => rejectFolders.indexOf(req.url.split("/")[1]) !== -1
}));
mongoose_1.default.connect(secrets_1.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
    console.log('MongoDB Connected!');
})
    .catch(err => {
    console.log("MongoDB connection error . Please make sure MongoDB is running. " + err);
    // process.exit();
});
mongoose_1.default.set("debug", false);
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, parameterLimit: 1000000 })); // experiment with this parameter and tweak
app.use(cors_1.default());
app.set("port", process.env.PORT);
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET
}));
app.use('/', checkTokenAuth_1.default);
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map