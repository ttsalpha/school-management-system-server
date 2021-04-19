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

Parents.updateById = (parents, result) => {
  sql.query("UPDATE parents SET " +
    "nameMom = ?, jobMom = ?, phoneMom = ?," +
    "nameDad = ? ,jobDad = ?, phoneDad = ? WHERE studentID = ?",
    [parents.nameMom, parents.jobMom, parents.phoneMom,
      parents.nameDad, parents.jobDad, parents.phoneDad, parents.studentID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Parents with the id
        result({kind: "not_found"}, null);
        return;
      }

      console.log("updated parents: ", {...parents});
      result(null, {...parents});
    }
  );
};

module.exports = Parents;