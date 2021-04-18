const sql = require("./connection");

// constructor
const Student = function () {};

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

Student.findById = (studentID, result) => {
  const context = "select s.studentID, s.fullName, s.className, s.gender," +
    "date_format(s.birthday, \"%d/%m/%Y\") as birthday, s.addressName, " +
    "p.nameDad, p.phoneDad, p.jobDad, p.nameMom, p.phoneMom, p.jobMom from student" +
    " s  inner join parents p on s.studentID = p.studentID where s.studentID = " +
    +studentID + ";"

  sql.query(context, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found this student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found profile of a student with the id
    result({kind: "not_found"}, null);
  });
};

module.exports = Student;