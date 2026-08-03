/**
 * ==========================================
 * InvestLab Event Dispatcher
 * ==========================================
 *
 * Enterprise Event Bus
 *
 * Version : 1.0.0
 */

class EventDispatcher {

    constructor() {

        /**
         * Registered listeners
         *
         * eventName => [callback]
         */
        this.listeners = new Map();

        /**
         * Statistics
         */
        this.stats = {

            emitted: 0,

            listeners: 0,

            errors: 0

        };

    }

    /**
     * =====================================
     * Register Listener
     * =====================================
     */

    on(event, callback) {

        if (!this.listeners.has(event)) {

            this.listeners.set(event, []);

        }

        this.listeners.get(event).push(callback);

        this.stats.listeners++;

    }

    /**
     * =====================================
     * Register Once
     * =====================================
     */

    once(event, callback) {

        const wrapper = async (payload) => {

            await callback(payload);

            this.off(event, wrapper);

        };

        this.on(event, wrapper);

    }

    /**
     * =====================================
     * Remove Listener
     * =====================================
     */

    off(event, callback) {

        if (!this.listeners.has(event)) {

            return;

        }

        const callbacks = this.listeners
            .get(event)
            .filter(fn => fn !== callback);

        this.listeners.set(event, callbacks);

    }

    /**
     * =====================================
     * Emit Event
     * =====================================
     */

    async emit(event, payload = {}) {

        this.stats.emitted++;

        const callbacks =
            this.listeners.get(event) || [];

        for (const callback of callbacks) {

            try {

                await callback(payload);

            }

            catch (err) {

                this.stats.errors++;

                console.error(
                    `[Dispatcher] ${event}`,
                    err.message
                );

            }

        }

    }

    /**
     * =====================================
     * Has Listener
     * =====================================
     */

    has(event) {

        return this.listeners.has(event);

    }

    /**
     * =====================================
     * Remove All Listener
     * =====================================
     */

    clear() {

        this.listeners.clear();

        this.stats.listeners = 0;

    }

    /**
     * =====================================
     * Statistics
     * =====================================
     */

    getStats() {

        return {

            events: this.listeners.size,

            listeners: this.stats.listeners,

            emitted: this.stats.emitted,

            errors: this.stats.errors

        };

    }

    /**
     * =====================================
     * Print Statistics
     * =====================================
     */

    printStats() {

        const stats = this.getStats();

        console.log("");
        console.log("=================================");
        console.log("Event Dispatcher");
        console.log("=================================");
        console.log("Events      :", stats.events);
        console.log("Listeners   :", stats.listeners);
        console.log("Emitted     :", stats.emitted);
        console.log("Errors      :", stats.errors);
        console.log("=================================");
        console.log("");

    }

}

export default new EventDispatcher();