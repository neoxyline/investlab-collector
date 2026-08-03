import { createChart } from "./chart.js";
import collectorConfig from "../config/collector.js";

class TradingViewManager {

    constructor() {

        /**
         * Semua chart aktif
         */
        this.charts = new Map();

        /**
         * Statistik
         */
        this.stats = {

            totalCharts: 0,

            runningCharts: 0,

            failedCharts: 0,

            reconnectCount: 0,

            startedAt: null

        };

    }

    /**
     * ===================================
     * Generate Key
     * ===================================
     */

    makeKey(symbol, timeframe) {

        return `${symbol}_${timeframe}`;

    }

    /**
     * ===================================
     * Create Chart
     * ===================================
     */

    create(symbol, timeframe, range = 500) {

        const key = this.makeKey(
            symbol,
            timeframe
        );

        if (this.charts.has(key)) {

            return this.charts.get(key);

        }

        const chart = createChart(

            symbol,

            timeframe,

            range

        );

        this.charts.set(

            key,

            {

                key,

                symbol,

                timeframe,

                range,

                chart,

                startedAt: new Date(),

                status: "running"

            }

        );

        this.stats.totalCharts++;

        this.stats.runningCharts++;

        if (!this.stats.startedAt) {

            this.stats.startedAt = new Date();

        }

        return chart;

    }

    /**
     * ===================================
     * Get Chart
     * ===================================
     */

    get(symbol, timeframe) {

        return this.charts.get(

            this.makeKey(

                symbol,

                timeframe

            )

        );

    }

    /**
     * ===================================
     * Get All Charts
     * ===================================
     */

    getAll() {

        return [...this.charts.values()];

    }

    /**
     * ===================================
     * Exists
     * ===================================
     */

    has(symbol, timeframe) {

        return this.charts.has(

            this.makeKey(

                symbol,

                timeframe

            )

        );

    }

    /**
     * ===================================
     * Remove Chart
     * ===================================
     */

    remove(symbol, timeframe) {

        const key = this.makeKey(

            symbol,

            timeframe

        );

        if (!this.charts.has(key)) {

            return false;

        }

        this.charts.delete(key);

        this.stats.runningCharts--;

        return true;

    }

    /**
     * ===================================
     * Stop All
     * ===================================
     */

    clear() {

        this.charts.clear();

        this.stats.totalCharts = 0;

        this.stats.runningCharts = 0;

    }

    /**
     * ===================================
     * Statistics
     * ===================================
     */

    getStats() {

        return {

            ...this.stats,

            reconnect: collectorConfig.tradingview.reconnect,

            reconnectDelay:
                collectorConfig.tradingview.reconnectDelay

        };

    }

    /**
     * ===================================
     * Print Status
     * ===================================
     */

    printStats() {

        const stats = this.getStats();

        console.log("");
        console.log("=================================");
        console.log("TradingView Manager");
        console.log("=================================");
        console.log("Charts      :", stats.runningCharts);
        console.log("Reconnect   :", stats.reconnect);
        console.log("Delay (ms)  :", stats.reconnectDelay);
        console.log("Started     :", stats.startedAt);
        console.log("=================================");
        console.log("");

    }

}

export default new TradingViewManager();