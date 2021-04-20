const sql = require("./connection");

// constructor
const Account = function (account) {
  this.username = account.username;
  this.password = account.password;
  this.teacherID = account.teacherID;
  this.role = account.role;
};

Account.findById = (ID, result) => {
  sql.query(`SELECT * FROM account WHERE teacherID = ${ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found account: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found account with the id
    result({kind: "not_found"}, null);
  });
};

Account.getAll = result => {
  sql.query("SELECT * FROM account", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("account: ", res);
    result(null, res);
  });
};

Account.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM account WHERE username = "${username}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found username: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found account with the id
    result({kind: "not_found"}, null);
  });
};

Account.create = (newAccount, result) => {
  sql.query("INSERT INTO account SET ?", newAccount, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created account: ", {id: res.insertId, ...newAccount});
    result(null, {id: res.insertId, ...newAccount});
  });
};

Account.updateById = (account, result) => {
  sql.query("UPDATE account SET username = ?, password = ? WHERE teacherID = ?",
    [account.username, account.password, account.teacherID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Account with the id
        result({kind: "not_found"}, null);
        return;
      }

      console.log("updated account: ", {...account});
      result(null, {...account});
    }
  );
};


module.exports = Account;