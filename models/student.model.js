const sql = require("./connection");

// constructor
const Student = function (student) {
  this.studentID = student.studentID;
  this.fullName = student.fullName;
  this.gender = student.gender;
  this.birthday = student.birthday;
  this.className = student.className;
};

Student.getAll = (teacherID, role, result) => {
  const contextAdmin = "select studentID, fullName, className, gender,"
    + "date_format(birthday, \"%d/%m/%Y\") as birthday from student;"

  const contextUser = "select studentID, fullName, className, gender," +
    "date_format(birthday, \"%d/%m/%Y\") as birthday from student " +
    "where className = (select className from class where teacherID = " +
    teacherID + ");"

  let context;
  if (role === "admin")
    context = contextAdmin;
  else
    context = contextUser;

  sql.query(context, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found list of student: ", res);
      result(null, res);
      return;
    }

    // not found list of student with teacher ID
    result({kind: "not_found"}, null);
  });
};

module.exports = Student;