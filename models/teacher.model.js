const sql = require("./connection");

// constructor
const Teacher = function (teacher) {
  this.teacherID = teacher.teacherID;
  this.fullName = teacher.fullName;
  this.gender = teacher.gender;
  this.birthday = teacher.birthday;
  this.cccd = teacher.cccd;
  this.position = teacher.position;
  this.addressName = teacher.addressName;
  this.phone = teacher.phone;
  this.email = teacher.email;
  this.reportsTo = teacher.reportsTo
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

Teacher.create = (newTeacher, result) => {
  sql.query("INSERT INTO teacher SET ?", newTeacher, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created teacher: ", {id: res.insertId, ...newTeacher});
    result(null, {id: res.insertId, ...newTeacher});
  });
};

module.exports = Teacher;