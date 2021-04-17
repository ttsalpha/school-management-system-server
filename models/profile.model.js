const sql = require("./connection");

// constructor
const Profile = function (account) {
  this.teacherID = account.teacherID;
  this.fullName = account.fullName;
  this.gender = account.gender;
  this.birthday = account.birthday;
  this.cccd = account.cccd;
  this.position = account.position;
  this.addressName = account.addressName;
  this.phone = account.phone;
  this.email = account.email;
  this.reportsTo = account.reportsTo;
};

Profile.findById = (teacherID, result) => {
  const context = "select t.teacherID, t.fullName, t.gender, "
    + "concat(day(t.birthday), '/', month(t.birthday), '/', year(t.birthday)) as birthday, "
    + "t.cccd, t.position, t.addressName, t.phone, t.email, "
    + "c.className from teacher t inner join class c on t.teacherID "
    + "= c.teacherID where t.teacherID = "
    + teacherID + ";"

  sql.query(context, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found profile: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found profile with the id
    result({kind: "not_found"}, null);
  });
};

module.exports = Profile;