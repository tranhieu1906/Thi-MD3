const fs = require("fs");
const { get } = require("http");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem");
const StudentModel = require("../model/student.model");
class StudentController {
  async showHome(req, res) {
    let data = await getTeamplates.readTemplate("./view/student.html");
    let result = await StudentModel.getListUsers();
    let html = "";
    result.forEach((element, index) => {
      html += `
      <tr>
                <th>${element.ID}</th>
                <th><a href="/detail?id=${element.ID}">${element.Name}</a></th>
                <th>${element.Class}</th>
                <th>${element.Evaluate}</th>
                <th>
                    <a href="/edit?id=${element.ID}">
                    <button class="btn border border-primary">Sửa</button>
                    </a>
                    <a href="/delete?id=${element.ID}" onclick="return confirm('Are you sure ?')">
                    <button class="btn border border-danger">Xóa</button>
                    </a>
                </th>
            </tr>
      `;
    });
    data = data.replace("{listStudent}", html);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async showStudentDetail(req, res, query) {
    let data = await getTeamplates.readTemplate("./view/detail.html");
    let result = await StudentModel.showStudentDetail(query);
    console.log(result);
    data = data.replace("{edit}", `/edit?id=${query}`);
    data = data.replace("{name}", result[0].Name);
    data = data.replace("{name}", result[0].Name);
    data = data.replace("{class}", result[0].Class);
    data = data.replace("{poinLT}", result[0].PoinLT);
    data = data.replace("{poinTH}", result[0].PoinTH);
    data = data.replace("{Evaluate}", result[0].Evaluate);
    data = data.replace("{Description}", result[0].Description);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async showAddStudent(req, res) {
    let data = await getTeamplates.readTemplate("./view/addStudent.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async addStudent(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let newData = qs.parse(data);
      console.log(newData);
      await StudentModel.addStudent(newData);
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async deleteStudent(req, res, query) {
    await StudentModel.deleteStudent(query);
    res.writeHead(301, { Location: "/" });
    res.end();
  }
  async showEditStudent(req, res, query) {
    let student = await StudentModel.showStudentDetail(query);
    console.log(student);
    let dataEdit = await getTeamplates.readTemplate("./view/editStudent.html");
    dataEdit = dataEdit.replace(
      "{input-name}",
      `<input width="100px" type="text" value="${student[0].Name}" class="form-control" placeholder="Name " name="name">`
    );
    dataEdit = dataEdit.replace(
      "{input-class}",
      `<input  type="text" value="${student[0].Class}" class="form-control" placeholder="Class" name="class" >`
    );
    dataEdit = dataEdit.replace(
      "{input-point_theory}",
      `<input  type="text" value="${student[0].PoinLT}" class="form-control" placeholder="Poin theory" name="theory" >`
    );
    dataEdit = dataEdit.replace(
      "{input-evaluate}",
      `<input  type="text" value="${student[0].Evaluate}"  class="form-control" placeholder="Evaluate(tachieved,not tachieved)" name="evaluate" >`
    );
    dataEdit = dataEdit.replace(
      "{input-point_practice}",
      ` <input  type="text" value="${student[0].PoinTH}" class="form-control" placeholder="Point practice" name="practice" >`
    );
    dataEdit = dataEdit.replace(
      "{input-describe_student}",
      ` <input  type="text" value="${student[0].Description}" class="form-control" placeholder="Point practice" name="describe" >`
    );
    res.writeHead(200, { "Content-type": "text/html" });
    res.write(dataEdit);
    res.end();
  }
  async EditStudent(req, res, query) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let dataInfo = qs.parse(data);
      console.log(dataInfo);
      StudentModel.updateStudent(dataInfo, query);
      res.writeHead(301, { Location: "/" });
      res.end();
    });
  }
}

module.exports = new StudentController();
