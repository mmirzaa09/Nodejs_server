const express = require('express') 
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require ('path');

const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    PORT = 3000,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRETE = 'mirza123123',
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'Production'

app.use(session({
    name : SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret : SESS_SECRETE,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) =>{
    res.json({message: 'Successfully for parsing data.'});
    console.log(req.sessionID)
})


require("./app/routes/user.route")(app);

app.listen(PORT, () => {
    console.log(`Server started @ http://192.168.1.12:${PORT}`)
})