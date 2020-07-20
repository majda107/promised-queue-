const QUEUE = require('../dist/index');

console.log("RUNNING TESTS");

const pq = new QUEUE.PromisedQueue(() => {
    console.log("job done, queue empty!");
}, () => {
    console.log("queue error! resetting...");
});

const task1 = async () => { console.log("task1") };
const task2 = async () => { console.log("task2") };
const task3 = async () => { console.log("task3") };

const task500ms = async () => {

    console.log("500ms start");
    await new Promise(res => {
        setTimeout(res, 500);
    });
    console.log("500ms done");

};
const task2000ms = async () => {

    console.log("2000ms start");
    await new Promise(res => {
        setTimeout(res, 2000);
    });
    console.log("2000ms done");

};

const taskError = async () => {
    throw new Error("Task error!");
}


pq.enqueue(task1);
pq.enqueue(task2);
pq.enqueue(task3);

pq.enqueue(task500ms);
pq.enqueue(task2000ms);
pq.enqueue(task1);

pq.enqueue(taskError);
pq.enqueue(task2);