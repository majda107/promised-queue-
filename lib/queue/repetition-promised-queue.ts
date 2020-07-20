import { PromisedQueue } from "./promised-queue";

export class RepetitionPromisedQueue extends PromisedQueue {

    repetition: number;

    constructor(repetition: number, done = () => { }, error = (e: any) => { }) {
        super(done, error);
        this.repetition = repetition;
    };

    dequeueTask(tasks: (() => Promise<any>)[]): (() => Promise<any>) | undefined {

        const cut = tasks.length % this.repetition;        
        tasks.splice(0, tasks.length - cut);

        return tasks.shift();
    }
}