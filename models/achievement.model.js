const sql = require("./connection");

// constructor
const Achievement = function (achievement) {
  this.studentID = achievement.studentID;
  this.gradeMath = achievement.gradeMath;
  this.gradeLiterature = achievement.gradeLiterature;
  this.gradeEnglish = achievement.gradeEnglish;
  this.ranking = achievement.ranking
};

Achievement.create = (newAchievement, result) => {
  sql.query("INSERT INTO achievement SET ?", newAchievement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Achievement: ", {id: res.insertId, ...newAchievement});
    result(null, {id: res.insertId, ...newAchievement});
  });
};

module.exports = Achievement;