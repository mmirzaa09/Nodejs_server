const sql = require("./db.js");

const tbl_User = function (user) {
    this.email = user.email;
    this.nama = user.nama;
    this.password = user.password;
};

tbl_User.create = (newUser, result) => {
    sql.query("INSERT INTO tbl_user SET ?", newUser, (err, res) =>{
        if(err){
            console.log("ERROR :", err);
            result(err, null);
            return;
        }

        console.log("Create User: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
};


tbl_User.findById = (userId, result) => {
    sql.query(
        `SELECT * FROM tbl_user WHERE id = ${userId}`,
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

            result({ kind: "not found"}, null);
        }
    );
};

tbl_User.getAll = result => {
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

tbl_User.updateById = (id, user, result) => {
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

tbl_User.remove = (id, result) => {
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

tbl_User.removeAll = (result) => {
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

module.exports = tbl_User;
