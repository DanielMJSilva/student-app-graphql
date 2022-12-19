const config = require("../../config/config");
const private_key = Buffer.from(config.PRIVATE_KEY, "base64").toString("ascii");
const public_key = Buffer.from(config.PUBLIC_KEY, "base64").toString("ascii");

module.exports = private_key;
//export { private_key, public_key };
