module.exports = (app) =>{
    const users = require("../controllers/user.controller");
    const auth = require("../controllers/auth.controller");

    app.post("/users", users.create);

    app.get("/users", users.findAll);

    app.get("/users/:userId", users.findOne);

    app.put("/users/:userId", users.update);

    app.delete("/users/:userId", users.delete);

    app.delete("/users", users.deleteAll);

    app.post('/login', auth.login);

    // app.post('/login', (req, res) => {
    //     console.log('Inside POST /login callback function')
    //     console.log(req.body)
    //     res.send(`You posted to the login page!\n`)
    // })

}
