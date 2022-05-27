/*
 * Title: notFoundHandler
 * Description: notFoundHandler
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// handler object - module scaffolding
const handler = {};
handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    Error: "This page is not found!",
  });
};
module.exports = handler;
