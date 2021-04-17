const sql = require("./connection");

// constructor
const Teacher = function (teacher) {
  this.teacherID = teacher.teacherID;
  this.fullName = teacher.fullName;
  this.birthday = teacher.birthday;
  this.position = teacher.position;
  this.className = teacher.className;
};

Teacher.getAll = result => {
  sql.query("select t.teacherID, t.fullName, t.position,"
    + " date_format(t.birthday, \"%d/%m/%Y\") as birthday , "
    + "c.className from teacher t left join class c on c.teacherID = t.teacherID;",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("teacher list: ", res);
      result(null, res);
    });
};

module.exports = Teacher;