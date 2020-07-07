module.exports = (app) =>{
    const users = require("../controllers/user.controller");
    const auth = require("../controllers/auth.controller");

    app.post("/users", users.create);

    app.get("/users", users.findAll);

    app.get("/users/:userId", users.findOne);

    app.put("/users/:userId", users.update);

    app.delete("/users/:userId", users.delete);

    app.delete("/users", users.deleteAll);



    // app.users("/auth", auth);
}
