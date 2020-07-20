# Promised queue

Simple asynchronous Javascript / Typescript queue with repetition check for social-media like actions (liking, subscribing...)

## Installation
`npm install queue-i-promised --save`

## Usage
```typescript
import { PromisedQueue, RepetitionPromisedQueue } from "queue-i-promised";

const pq = new PromiseQueue();
const rpq = new RepetitionPromisedQueue(2);

pq.enqueue(async () => { await longRunningJob(); });
rqp.enqueue(async () => { await longRunningJob(); });
```

For better understanding check `test.js` file in `/test` folder.

## Test
```sh
npm run test
```

## Build
```sh
npm run build
```
