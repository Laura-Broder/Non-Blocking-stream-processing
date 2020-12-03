const express = require("express");
const startStream = require("./msgStreamer");
const { filterData, countAll } = require("./processData");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init in-memory variable for the count
let msgStream = [];

// callback function to save the stats
const saveStream = (msg) => {
  const cleanData = filterData(msg);
  if (cleanData.length) {
    msgStream.push(...cleanData);
  }
};

// start the count on server load
startStream(saveStream);

// get count
app.get("/count", function (req, res) {
  const currentCount = countAll(msgStream);
  res.send(currentCount);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
