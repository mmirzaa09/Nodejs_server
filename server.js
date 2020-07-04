const express = require('express') 
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
    res.json({message: 'Successfully for parsing data.'});
})

require("./app/routes/user.route")(app);
app.listen(8080, () => {
    console.log('Server started @ http://192.168.1.8:8080')
})