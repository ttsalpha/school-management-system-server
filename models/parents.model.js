const sql = require("./connection");

// constructor
const Parents = function (parents) {
  this.studentID = parents.studentID;
  this.nameMom = parents.nameMom;
  this.phoneMom = parents.phoneMom;
  this.jobMom = parents.jobMom
  this.nameDad = parents.nameDad;
  this.phoneDad = parents.phoneDad;
  this.jobDad = parents.jobDad;
};

Parents.create = (newParents, result) => {
  sql.query("INSERT INTO parents SET ?", newParents, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created parents: ", {id: res.insertId, ...newParents});
    result(null, {id: res.insertId, ...newParents});
  });
};

module.exports = Parents;