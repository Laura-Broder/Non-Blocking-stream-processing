# Take Home Test from BigPanda

Your exercise is to implement a Non Blocking Producer/Consumer stream processing service.

You are provided with a blackbox executable that spits out an infinite stream of lines of event data encoded in JSON.

## Service Requirements

1. It should consume the output of the generator and gather the following stats:
   - A count of events by event type.
   - A count of words encountered in the data field of the events. (e.g. “the” → 32, “me” → 5)
   - Bonus: support the ability to receive the stats above in the last 60 seconds.
2. It should expose these stats in an HTTP interface.
3. Stream may encounter corrupt JSON lines and should handle these.

## Important Notes:

1. We are looking for simple readable code which is not over-engineered.
2. The architecture of your service should obviously decouple the data processing, HTTP handling, be testable, etc.
3. You can implement this exercise in any high level language you choose (Java, Scala, C#, python, node.js etc.). Please let us know in advance which language you choose.

## Task Submission

Once Done, please create a Github repo and send us a link.

## RUNNING THE EXECUTABLE

1. On a Unix OS, run chmod x+ <filename>. For example: chmod x+ ./generator-macosx-amd64

2. Then when you try and run the program from your terminal, you will get a prompt to allow the execution.
3. Then the Security & Privacy window will pop up
4. Then you can allow the specific executable to run
