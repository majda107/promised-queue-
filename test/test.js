const QUEUE = require('../dist/index');

console.log("RUNNING TESTS");

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

function test1() {

    // TEST 1
    console.log("[GLOBAL] running test 1...");

    const pq = new QUEUE.PromisedQueue(() => {
        console.log("job done, queue empty!");
        test2();
    }, () => {
        console.log("queue error! resetting...");
        test2();
    });


    pq.enqueue(task1);
    pq.enqueue(task2);
    pq.enqueue(task3);

    pq.enqueue(task500ms);
    pq.enqueue(task2000ms);
    pq.enqueue(task1);

    pq.enqueue(taskError);
    pq.enqueue(task2);
};

function test2() {

    // TEST 2
    console.log("[GLOBAL] running test 2...");

    const rpq = new QUEUE.RepetitionPromisedQueue(3, () => {
        console.log("rqp job done!");
    });

    for (let i = 0; i < 10; i += 1) {
        rpq.enqueue(task1);
        rpq.enqueue(task2);
        rpq.enqueue(task3);
    };

    // WILL ACOMLISH ALL 3 BECAUSE OF ENQUEUE DELAY!!!!
    rpq.enqueue(task1);
    rpq.enqueue(task2);
    rpq.enqueue(task3);
};


test1();