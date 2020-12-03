const { spawn } = require("child_process");

const exeFilePath =
  "c:/Users/laura/DEV/Job-Interviews/BigPanda/generator-windows-amd64.exe";
const getData = () => {
  const ls = spawn(exeFilePath);

  ls.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  ls.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
