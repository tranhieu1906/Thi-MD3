const StudentController = require("../controller/Student.controller");
const url = require("url");
const qs = require("qs");
const fs = require("fs");
function router(req, res) {
  let parseUrl = url.parse(req.url);
  let path = parseUrl.path;
  let query = qs.parse(parseUrl.query);
  switch (path) {
    case "/":
      StudentController.showHome(req, res);
      break;
    case "/add-student":
      if (req.method == "GET") {
        StudentController.showAddStudent(req, res);
      } else {
        StudentController.addStudent(req, res);
      }
      break;
    case `/detail?id=${query.id}`:
      StudentController.showStudentDetail(req, res, query.id);
      break;
    case `/delete?id=${query.id}`:
      StudentController.deleteStudent(req, res, query.id);
      break;
    case `/edit?id=${query.id}`:
      if (req.method === "GET"){
        StudentController.showEditStudent(req, res, query.id);
      }else{
        StudentController.EditStudent(req, res, query.id);
      }
      break;
  }
}
module.exports = router;
