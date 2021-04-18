const sql = require("./connection");

// constructor
const Account = function () {};

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

module.exports = Account;