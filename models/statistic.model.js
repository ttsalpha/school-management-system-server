const sql = require("./connection");

// constructor
const Statistic = function (student) {
  this.studentID = student.studentID;
  this.fullName = student.fullName;
  this.gradeMath = student.gradeMath;
  this.gradeLiterature = student.gradeLiterature;
  this.gradeEnglish = student.gradeEnglish;
  this.total = student.total;
};

Statistic.getAll = (teacherID, role, result) => {
  const contextAdmin = "select a.studentID, s.fullName, a.gradeMath, a.gradeLiterature, a.gradeEnglish, "
    + "round((a.gradeMath + a.gradeLiterature + a.gradeEnglish) / 3.0, 1) as total from achievement a "
    + "inner join student s on a.studentID = s.studentID;"

  const contextUser = "select a.studentID, s.fullName, a.gradeMath, a.gradeLiterature, a.gradeEnglish, "
    + "round((a.gradeMath + a.gradeLiterature + a.gradeEnglish) / 3.0, 1) as total from achievement a "
    + "inner join student s on a.studentID = s.studentID" +
    " where s.className = (select className from class where teacherID = "
    + teacherID + ");"

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
      console.log("found transcript of class : ", res);
      result(null, res);
      return;
    }

    // not found transcript of class with teacher ID
    result({kind: "not_found"}, null);
  });
};

module.exports = Statistic;