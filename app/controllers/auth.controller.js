const sql = require("../models/db");

exports.login = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    sql.query('SELECT * FROM tbl_user WHERE email = ? AND password = ?', [email, password], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                const pass = (password, results[0])
                if (pass) {
                    res.send({
                        "code": 200,
                        "success": "login successfully"
                    })
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    })
                }
            } else {
                res.send({
                    "code": 206,
                    "success": "Email and Password does not match"
                });
            }
        }
    });
}