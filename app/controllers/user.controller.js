const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !",
        });
    }

    const user = new User({
        email : req.body.email,
        nama : req.body.nama,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if(err.kind === "Not Found") {
            res.status(404).send({
                message: `Not Found User With Id ${req.params.userId}.`,
            });
            } else {
                res.status(500).send({
                    message:
                        "Error Retrieving User with id " +
                        req.params.userId
                });
            } 
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    User.getAll((err, data) =>{
        if(err)
        res.status(500).send({
            message: err.message || "Some Error Occurred.",
        });
        else res.send(data);
    })
}


exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not found") {
                    res.status(404).send({
                        message: `not found user with id ${req.params.userId}.`,
                    });
                } else {
                    res.status(500).send({
                        message: 
                            "Error update user with id " +
                            req.params.userId,
                    });
                }
            }   else res.send(data);
        }
    );
};


exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) =>{
        if (err) {
            if(err.kind === "not found") {
                res.status(404).send({
                    message: `not found user with id ${req.params.userId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "could not delete user with id " +
                        req.params.userId,
                });
            }
        } else res.send({ message: `user was delete successfully! `});
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) =>{
        if(err) {
            res.status(500).send({
                message: 
                    err.message ||
                    "Some error occurred while removing all users. ",
            });
        } else res.send({ message: `all user were deleted successfully!` })
    });
};

