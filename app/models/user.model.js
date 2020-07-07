const sql = require("./db.js");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const User = function (user) {
    this.email = user.email;
    this.nama = user.nama;
    this.password = bcrypt.hashSync(user.password, salt);
};

User.create = (newUser, result, req, next) => {
    sql.query("INSERT INTO tbl_user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        console.log("created customer: ", {
            id: res.insertId,
            ...newUser
        });
        result(null, {
            id: res.insertId,
            ...newUser
        });
    });
};

User.findById = (email, result) => {
    sql.query(
        `SELECT * FROM tbl_user WHERE id = ${email}`,
        (err, res) => {
            if(err) {
                console.log("ERROR :", err);
                result(err, null);
                return;
            }
            if(res.length) {
                console.log("Found User", res[0]);
                result(null, res);
                return;
            }
            result({ kind: "email not found"}, null);
        }
    );
};

User.getAll = result => {
    sql.query("SELECT * FROM tbl_user", (err, res) =>{
        if(err) {
            console.log("ERROR", err);
            result(null, err);
            return;
        }

        console.log("User", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE tbl_user SET email= ?, nama=?, password = ? WHERE id= ?",
        [user.email, user.nama, user.password, id],
        (err, res)=> {
            if(err) {
                console.log("ERROR:", err);
                result(null, err);
                return;
            };
            
            if(res.affectedRows == 0) {
                result({ kind: "not found"}, null );
                return;
            }

            console.log("Update user :", {id: id, ...user});
            result(null, {id: id, ...user});
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM tbl_user WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("ERROR :", err);
            result(null, err);
            return;
        };

        if(res.affectedRows == 0) {
            result({ kind: "not found"}, null);
            return;
        }

        console.log("Deleted user with id :", id)
        result(null, res);
    });
};

User.removeAll = (result) => {
    sql.query("DELETE FROM tbl_user", (err, res) => {
        if(err) {
            console.log("ERROR :", err);
            result(null ,err);
            return;
        }

        console.log(`delete ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User;
