import { Noti } from "./NotifyHandler";
interface Queue {
    queue: (signal?: AbortSignal) => Promise<void>,
    onError: (error: unknown) => Promise<void>,
}
/**
 * Just a simple object to handle optimic sync
 * Queue have queue (func to run/call API) and onError (what it do when error)
 * We need to split it into 2 function, 
 * it make more easer to handle optimic error and thunk error 
 * (if you throw, we will lost thunk context, and only handle one of 2 side (optimic or thunk))
 * Another thing no need to explain, i think it clear enough to read
 */
const coreOptimicQueue = {
    fails: [] as Queue[],
    queues: [] as Queue[],
    running: false,
    isOnl: navigator.onLine,
    init: function () {
        window.removeEventListener("online", this.handleOnl.bind(this));
        window.removeEventListener("offline", this.handleOff.bind(this));
        window.addEventListener("online", this.handleOnl.bind(this));
        window.addEventListener("offline", this.handleOff.bind(this));
        this.isOnl = navigator.onLine;
    },

    addQuery: function (data: Queue) {
        if (!this.isOnl) {
            this.fails.push(data);
        } else {
            this.queues.push(data);
            if (!this.running) this.process();
        }
    },
    handleOff: function () {
        Noti(
            "Warning: You are offline, if you update data, that make cause conflict"
        );
        this.isOnl = false;
    },
    handleOnl: function () {
        Noti("You are online, data is sync...");
        this.isOnl = true;
        this.retry();
    },
    process: async function (): Promise<void> {
        if (this.running) return
        this.running = true;

        while (this.queues.length > 0) {
            const queue = this.queues.shift();
            if (queue)
                if (!this.isOnl) {
                    this.fails.push(queue);
                } else {
                    try {
                        await queue.queue();
                    } catch (error) {
                        this.fails.push(queue)
                        await queue.onError(error)
                    }
                }
        }
        this.running = false;
    },
    retry: async function (): Promise<void> {
        if (this.running) return;
        this.running = true;
        if (this.running) {

            while (this.fails.length > 0) {
                const queue = this.fails.shift();
                if (queue) {
                    try {
                        const { signal } = new AbortController()
                        await queue.queue(signal);
                    } catch (error) {
                        await queue.onError(error)
                    }
                }
            }
        }
        this.running = false;
        if (this.queues.length > 0) {
            this.process()
        }
    },
    isError: function () {
        return this.fails.length > 0 && !this.running && this.queues.length == 0;
    },
};
coreOptimicQueue.init();
export default coreOptimicQueue;
