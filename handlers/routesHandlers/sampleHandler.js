/*
 * Title: sampleHandler
 * Description: sampleHandler
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// handler object - module scaffolding
const handler = {};
handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    message: "This page is sample url!",
  });
};
module.exports = handler;
