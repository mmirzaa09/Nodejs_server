const User = require("../models/auth.model");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.auth = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !",
        });
    }
    const user = new User({
        email: req.body.email,
        nama: req.body.nama,
        password: bcrypt.hashSync(req.body.password, salt)
    });

    User.auth(user, (err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured.",
            });
        }
        else res.send(data);
    });
};