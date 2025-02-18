const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');

const URLRouter = require('./Routes/routes')
const StaticRouter = require("./Routes/static_router")
const UserRouter = require("./Routes/auth")

const { connectMongoDb } = require("./connection")
const { checkForAuthentication, allowAccesTo} = require("./Middlewares/auth")

const app = express();
const port = 8001;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

connectMongoDb("mongodb://localhost:27017/url-shortener")
    .then(r => console.log("MongoDB Connected")).catch(err => console.error(err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication)
// false when working with simple form data.
// true when handling nested objects or complex data.

app.use("/url", allowAccesTo(['NORMAL', 'ADMIN']), URLRouter)
// Inline middleware only for /url
app.use("/", StaticRouter)
app.use('/user', UserRouter)

app.listen(port, () => console.log(`Listening on port ${port}`));
