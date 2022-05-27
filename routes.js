/*
 * Title: routes
 * Description: routes
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// dependencies
const { sampleHandler } = require("./handlers/routesHandlers/sampleHandler");
const { usersHandler } = require("./handlers/routesHandlers/usersHandler");

// routes object - moudle scaffolding
const routes = {
  sample: sampleHandler,
  user:usersHandler
};
module.exports = routes;
