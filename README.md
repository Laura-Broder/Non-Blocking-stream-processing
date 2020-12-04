# Description

An implementation of a Non Blocking Producer/Consumer stream processing service.

(Works with a with a blackbox executable that spits out an infinite stream of lines of event data encoded in JSON)

# Features

1. Consumes the output of the generator and gather the following stats:
   - A count of events by event type.
   - A count of words encountered in the data field of the events. (e.g. “the” → 32, “me” → 5)
   - Supports the ability to receive the stats above in the last 60 seconds.
2. Exposes these stats in an HTTP interface.
3. Handles corrupt JSON lines.

# API

## get current count API call:

```
localhost:4000/count?timeFrame={time frame}
```

## Parameters:

"timeFrame" - (optional) use this query to get the count during the last given seconds.

## Examples of API calls:

- get the count all the stream since the server started:

```
localhost:4000/count
```

- get the count of stream in the last 30 seconds:

```
localhost:4000/count?timeFrame=30
```
