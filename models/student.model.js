const sql = require("./connection");

// constructor
const Student = function (student) {
  this.studentID = student.studentID;
  this.fullName = student.fullName;
  this.gender = student.gender;
  this.birthday = student.birthday;
  this.className = student.className;
  this.addressName = student.addressName
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

Student.findById = (studentID, result) => {
  const context = "select s.studentID, s.fullName, s.className, s.gender," +
    "date_format(s.birthday, \"%Y/%m/%d\") as birthday, s.addressName, " +
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

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", {id: res.insertId, ...newStudent});
    result(null, {id: res.insertId, ...newStudent});
  });
};

Student.delete = (studentID, result) => {
  sql.query("delete from student where studentID = ?", studentID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Student with the id
      result({kind: "not_found"}, null);
      return;
    }

    console.log("deleted student with student id: ", studentID);
    result(null, res);
  });
};

Student.updateById = (student, result) => {
  sql.query("UPDATE student SET " +
    "fullName = ?, gender = ?, birthday = ?, className = ?" +
    ",addressName = ? WHERE studentID = ?",
    [student.fullName, student.gender, student.birthday,
      student.className, student.addressName, student.studentID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Student with the id
        result({kind: "not_found"}, null);
        return;
      }

      console.log("updated student: ", {...student});
      result(null, {...student});
    }
  );
};

module.exports = Student;