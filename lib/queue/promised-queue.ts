export class PromisedQueue {

    private queue: (() => Promise<any>)[];
    private working: boolean;

    private doneCallback: () => any;
    private errorCallback: (e: any) => any;

    constructor(done = () => { }, error = (e: any) => { }) {
        this.queue = [];
        this.working = false;

        this.doneCallback = done;
        this.errorCallback = error;
    };

    public async enqueue(task: (() => Promise<any>)) {
        this.queue.push(task);
        await this.dequeue();
    };

    protected dequeueTask(tasks: (() => Promise<any>)[]): (() => Promise<any>) | undefined {
        return tasks.shift();
    };

    private async dequeue() {

        if (this.working) return;
        this.working = true;

        const work = this.dequeueTask(this.queue);

        // IF QUEUE IS DONE
        if (work === undefined) {
            this.working = false;
            this.doneCallback();
            return;
        }

        try {
            await work();
        } catch (e) {
            this.errorCallback(e);

            this.queue = [];
            this.working = false;

            return;
        }

        this.working = false;
        await this.dequeue();
    };
};