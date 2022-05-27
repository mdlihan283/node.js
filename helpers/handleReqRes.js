/*
 * Title: handleReqRes
 * Description: handleReqRes
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routesHandlers/notFoundHandler");
const { parseJson } = require("../helpers/utilities");

// handle object - module scaffolding
const handle = {};
handle.handleReqRes = (req, res) => {
  // handle request
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const requestObjectProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    requestObjectProperties.body = parseJson(realData);
    chosenHandler(requestObjectProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 200;
      payload = typeof payload === "object" ? payload : {};
      const stringPayload = JSON.stringify(payload);
      res.setHeader("Content-type", "application/json");
      res.writeHead(statusCode);
      res.end(stringPayload);
    });
  });
};
module.exports = handle;
