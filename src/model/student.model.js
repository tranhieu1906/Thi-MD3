const db = require("./DBconnect");

class Student {
  async getListUsers() {
    let sql = "SELECT * FROM Students";
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async showStudentDetail(id) {
    let sql = `SELECT * FROM Students where ID = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async addStudent(data) {
    let sql = `insert into Students (Name,Class,PoinLT,PoinTH,Evaluate,Description) 
    values ('${data.name}','${data.class}','${data.poinLT}','${data.poinTH}','${data.evaluate}','${data.description}')`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async deleteStudent(id) {
    let sql = `delete from Students where id = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async updateStudent(data,id){
    let sql = `update students set Name = '${data.name}',Class = '${data.class}',PoinLT = ${data.theory},Evaluate = '${data.evaluate}',PoinTH = ${data.practice},Description='${data.describe}' where id = ${id}`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = new Student();
