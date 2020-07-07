const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const sql = require("./db.js");

const User = function (user) {
    this.email = user.email;
    this.nama = user.nama;
    this.password = bcrypt.hashSync(user.password, salt);
};


User.auth = function(req, res){
    sql.query(
        'SELECT * FROM tbl_user WHERE email = ?', 
        [email], function(error, result, fields) 
        {
            if (error ) {
                res.json({
                    status: false,
                    message: 'there are some error with query'
                });
            } else {
                if(result.length>0) {
                    decryptedString = bcrypt.decrypt(result[0].password);
                    if(password==decryptedString){
                        res.json({
                            status: true,
                            message:'Successfully authenticated'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Email and password does not match"
                        });
                    }
                }
                else {
                    res.json({
                        status: false,
                        message: "email does not exits"
                    });
                }
            } 
        });
}

module.exports = User;