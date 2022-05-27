/*
 * Title: Node js project
 * Description: Node js project
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environments = require("./helpers/environments");

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environments.port, () => {
    console.log(`Lissening to port ${environments.port}`);
  });
};

// handle request response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
