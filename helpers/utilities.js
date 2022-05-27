/*
 * Title: utilities
 * Description: utilities
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// dependencies
const crypto = require("crypto");
const environments = require("../helpers/environments");

// utilities object - module scaffolding
const utilities = {};
utilities.parseJson = (stringJson) => {
  let output;
  try {
    output = JSON.parse(stringJson);
  } catch {
    output = {};
  }
  return output;
};
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", environments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
};
module.exports = utilities;
