// ----------------------------------------------------
// add to count helper function
// ----------------------------------------------------
const addToCount = (msgObj, countObj) => {
  // save event count
  countObj.eventTypeCount[msgObj.event_type] =
    countObj.eventTypeCount[msgObj.event_type] + 1 || 1;
  // save data count
  countObj.dataCount[msgObj.data] = countObj.dataCount[msgObj.data] + 1 || 1;
  return countObj;
};
// ----------------------------------------------------

// ----------------------------------------------------
// count with time frame helper function
// ----------------------------------------------------
const countInTimeFrame = async (arr, timeFrame) => {
  let statsWithTimeFrame = {
    timeFrame: `${timeFrame} sec`,
    eventTypeCount: {},
    dataCount: {},
  };
  const minTime = Math.floor(Date.now() / 1000) - parseInt(timeFrame);

  for (let i = 0; i < arr.length; i++) {
    // convert string to object
    const msgObj = JSON.parse(arr[i]);
    // check if msg is in the correct format
    if (msgObj.event_type && msgObj.data && msgObj.timestamp) {
      // stop counting when item msg is out of time frame and return the count
      if (msgObj.timestamp < minTime) {
        return statsWithTimeFrame;
      }
      // add count in time frame
      statsWithTimeFrame = addToCount(msgObj, statsWithTimeFrame);
    }
  }
  return statsWithTimeFrame;
};
// ----------------------------------------------------

// ----------------------------------------------------
// count all helper function
// ----------------------------------------------------
const countAll = async (arr) => {
  // save count of all if no time frame was given
  let stats = {
    eventTypeCount: {},
    dataCount: {},
  };
  arr.forEach((msg) => {
    // convert string to object
    const msgObj = JSON.parse(msg);
    // check if msg is in the correct format
    if (!(msgObj.event_type && msgObj.data && msgObj.timestamp)) {
      return;
    }
    // add count
    stats = addToCount(msgObj, stats);
  });
  return stats;
};
// ----------------------------------------------------

// ----------------------------------------------------
// count data and return an object
// ----------------------------------------------------
exports.count = async (arr, timeFrame) => {
  // save count in time frame
  if (timeFrame) {
    if (isNaN(timeFrame) || timeFrame < 0) {
      throw new Error("time frame query is not a number");
    }
    return countInTimeFrame(arr, timeFrame);
  } else {
    return countAll(arr);
  }
};
// ----------------------------------------------------

// ----------------------------------------------------
// initial filter of the data (discard corrupt data)
// ----------------------------------------------------
exports.filterData = async (arr) => {
  return await arr.filter((msg) => {
    try {
      // console.log(typeof JSON.parse(msg), JSON.parse(msg));
      return JSON.parse(msg);
    } catch (e) {
      return false;
    }
  });
};
// ----------------------------------------------------
