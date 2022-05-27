/*
 * Title: usersHandler
 * Description: usersHandler
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// dependencies
const { hash, parseJson } = require("../../helpers/utilities");
const data = require("../../lib/data");

// handler object - module scaffolding
const handler = {};
handler.usersHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};
handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;
  if (firstName && lastName && phone && password && tosAgreement) {
    let userObject = {
      firstName,
      lastName,
      phone,
      password: hash(password),
      tosAgreement,
    };
    data.read("users", phone, (err) => {
      if (err) {
        // next work
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: "file created succesfully!",
            });
          } else {
            callback(500, {
              error: "couldn't create file successfully!",
            });
          }
        });
      } else {
        callback(500, {
          error: "There is problem in a server side!",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request!",
    });
  }
};

handler._users.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    data.read("users", phone, (err, u) => {
      const users = { ...parseJson(u) };
      if (!err && users) {
        delete users.password;
        callback(200, users);
      } else {
        callback(404, {
          error: "Request user was not found!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Request user was not found!",
    });
  }
};

handler._users.put = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  if (phone) {
    if (firstName || lastName || password) {
      data.read("users", phone, (err, uData) => {
        let userData = { ...parseJson(uData) };
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }
          data.update("users", phone, userData, (err) => {
            if (!err) {
              callback(200, {
                message: "user was updated succefully!",
              });
            } else {
              callback(500, {
                error: "There was a problem in a server side!",
              });
            }
          });
        } else {
          callback(400, {
            error: "you have a problem in your request!",
          });
        }
      });
    } else {
      callback(400, {
        error: "you have a problem in your request!",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number please try again!",
    });
  }
};

handler._users.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, {
              message: "User was succesfully deleted!",
            });
          } else {
            callback(500, {
              error: "There was a problem in the server side!",
            });
          }
        });
      } else {
        callback(500, {
          error: "There was a problem in the server side!",
        });
      }
    });
  } else {
    callback(500, {
      error: "There is a problem in our request!",
    });
  }
};

module.exports = handler;
