const http = require("http");
const router = require("./src/router/router");

const PORT = 8000;

let server = http.createServer(router);
server.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
