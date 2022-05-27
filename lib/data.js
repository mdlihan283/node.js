/*
 * Title: data.js
 * Description: data.js
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// dependencies
const fs = require("fs");
const path = require("path");

// lib object - module scaffolding
const lib = {};

// base directory and data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = (dir, file, data, callback) => {
  // open file writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        // open file for writing and then close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback(err);
              }
            });
          } else {
            callback(err);
          }
        });
      } else {
        callback(err);
      }
    }
  );
};

// read data to file
lib.read = (dir, file, callback) => {
  // open file for reading
  fs.readFile(
    lib.basedir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      callback(err, data);
    }
  );
};

// update existing file
lib.update = (dir, file, data, callback) => {
  // open file for updating
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        // truncate the file
        fs.truncate(fileDescriptor, (err) => {
          fs.writeFile(fileDescriptor, stringData, (err) => {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback(err);
              }
            });
          });
        });
      } else {
        callback(err);
      }
    }
  );
};

// delete exitsting file
lib.delete = (dir, file, callback) => {
  fs.unlink(lib.basedir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(err);
    }
  });
};

module.exports = lib;
