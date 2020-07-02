const express = require('express') 
const bodyParser = require('body-parser');
const app = express();
// const session = require('express-session');
// const uuid = require('uuid')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//     genid: (req) => {
//         console.log('Inside the session middleware');
//         console.log(req.sessionID);
//         return uuid();
//     },
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }))

app.get('/', (req, res) =>{
    res.json({message: 'Successfully for parsing data.'});
})

require("./app/routes/user.route")(app);
app.listen(8080, () => {
    console.log('Server started @ http://192.168.1.13:8080')
})