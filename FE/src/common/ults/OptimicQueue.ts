import { Noti } from "./NotifyHandler";
const coreOptimicQueue = {
    fails: [] as ({ queue: () => Promise<void>, onError: (error: unknown) => Promise<void> })[],
    queues: [] as ({ queue: () => Promise<void>, onError: (error: unknown) => Promise<void> })[],
    running: false,
    isOnl: navigator.onLine,
    init: function () {
        window.removeEventListener("online", this.handleOnl.bind(this));
        window.removeEventListener("offline", this.handleOff.bind(this));
        window.addEventListener("online", this.handleOnl.bind(this));
        window.addEventListener("offline", this.handleOff.bind(this));
        this.isOnl = navigator.onLine;
    },

    addQuery: function (func: () => Promise<void>, error: (error: unknown) => Promise<void>) {
        if (!this.isOnl) {
            this.fails.push({ queue: func, onError: error });
        } else {
            this.queues.push({ queue: func, onError: error });
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
                        console.log(error)
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
                        await queue.queue();
                    } catch (error) {
                        console.log(error)
                        await queue.onError(error)
                    }
                }
            }
        }
        this.running = false;
    },
    isError: function () {
        return this.fails.length > 0 && !this.running && this.queues.length > 0;
    },
};
coreOptimicQueue.init();
export default coreOptimicQueue;
