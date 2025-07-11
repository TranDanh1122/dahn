import { ErrorHandler, Noti } from "./NotifyHandler"
const coreOptimicQueue = {
    fails: [] as (() => Promise<void>)[],
    queues: [] as (() => Promise<void>)[],
    running: false,
    isOnl: navigator.onLine,
    init: function () {
        window.addEventListener("online", this.handleOnl)
        window.addEventListener("offline", this.handleOff)
        this.isOnl = navigator.onLine
    },

    addQuery: function (func: () => Promise<void>) {
        if (!this.isOnl) {
            this.fails.push(func)
        } else {
            this.queues.push(func)
            if (!this.running) this.process()
        }

    },
    handleOff: function () {
        Noti("Warning: You are offline, if you update data, that make cause conflict")
        this.isOnl = false
    },
    handleOnl: function () {
        Noti("You are online, data is sync...")
        this.isOnl = true
        this.retry()
    },
    process: async function (): Promise<void> {
        while (this.queues.length > 0) {
            const queue = this.queues.shift()
            if (queue)
                if (!this.isOnl) {
                    this.fails.push(queue)
                } else {

                    try {

                        await queue()
                    } catch (e) {
                        console.log(e)
                        this.fails.push(queue)
                    }

                }
        }
        this.running = false
    },
    retry: async function (): Promise<void> {
        while (this.fails.length > 0) {
            const queue = this.fails.shift()
            if (queue) {
                try {
                    await queue()
                } catch (e) {
                    if (typeof e == "string") {
                        ErrorHandler(e)
                    }

                }
            }
        }
    }
}
coreOptimicQueue.init()
export default coreOptimicQueue