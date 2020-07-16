let env;
if (process.env.NODE_ENV !== "test") {
  process.argv.forEach(function (val) {
    const arg = val.split("=");
    if (arg.length > 0) {
      if (arg[0] === "env") {
        env = require("./" + arg[1] + "-config.json");
      }
    }
  });
} else env = require("./dev-config.json");

module.exports = env;
