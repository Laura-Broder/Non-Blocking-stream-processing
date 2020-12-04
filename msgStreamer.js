const { spawn } = require("child_process");

const startStream = (callback) => {
  const ls = spawn("./generator-windows-amd64.exe");

  ls.stdout.on("data", (data) => {
    // ----------------------------------------------------
    // convert massage steam to string and split on line break
    // ----------------------------------------------------
    const msg = data.toString().split("\n");
    callback(msg);
  });

  ls.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

module.exports = startStream;
