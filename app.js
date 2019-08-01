//Entry point for server
//var { PORT=8080 , NODE_ENV } = process.env;
//const dev = NODE_ENV === 'development';
//console.log("dev:", dev);
require = require("esm")(module);
module.exports = require("./src/server/server");