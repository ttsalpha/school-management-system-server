const sql = require("./connection");

// constructor
const Account = function (account) {
  this.ID = account.ID;
  this.username = account.username;
  this.password = account.password;
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


module.exports = Account;