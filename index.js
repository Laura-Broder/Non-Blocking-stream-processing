const express = require("express");
const startStream = require("./msgStreamer");
const { filterData, count } = require("./processData");

const port = 4000;

const app = express();

app.use(express.json());

// ----------------------------------------------------
// init in-memory variable for the incoming massage stream
// ----------------------------------------------------
let msgStreamArr = [];

// ----------------------------------------------------
// callback function to save the stream
// ----------------------------------------------------
const saveStream = async (msg) => {
  // save only correct data (no corrupt massages)
  const cleanData = await filterData(msg);
  if (cleanData.length) {
    // add new massages to the beginning of the array
    msgStreamArr.unshift(...cleanData);
  }
};

// ----------------------------------------------------
// start the stream on server load
// ----------------------------------------------------
startStream(saveStream);
// ----------------------------------------------------
// get count
// ----------------------------------------------------
app.get("/count", async (req, res) => {
  const timeFrame = req.query.timeFrame;
  try {
    const currentCount = await count(msgStreamArr, timeFrame);
    res.send(currentCount);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
