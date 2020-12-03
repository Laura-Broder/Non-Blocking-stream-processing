exports.filterData = (arr) => {
  return arr.filter((msg) => {
    try {
      return JSON.parse(msg);
    } catch (e) {
      return false;
    }
  });
};

exports.countAll = (arr) => {
  const stats = {
    eventTypeCount: {},
    dataCount: {},
    last60Sec: { eventTypeCount: {}, dataCount: {} },
  };

  arr.forEach((msg) => {
    // convert string to object
    const msgObj = JSON.parse(msg);
    // check if msg is in the correct format
    if (!(msgObj.event_type && msgObj.data && msgObj.timestamp)) {
      return;
    }
    // save event count
    stats.eventTypeCount[msgObj.event_type] =
      stats.eventTypeCount[msgObj.event_type] + 1 || 1;
    // save data count
    stats.dataCount[msgObj.data] = stats.dataCount[msgObj.data] + 1 || 1;
    // save 60 sec count
    const timeMinBack = Math.floor(Date.now() / 1000) - 60;
    if (msgObj.timestamp > timeMinBack) {
      // save event count
      stats.last60Sec.dataCount[msgObj.data] =
        stats.last60Sec.dataCount[msgObj.data] + 1 || 1;
      // save data count
      stats.last60Sec.eventTypeCount[msgObj.event_type] =
        stats.last60Sec.eventTypeCount[msgObj.event_type] + 1 || 1;
    }
  });
  return stats;
};
