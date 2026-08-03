/**
 * ==========================================
 * InvestLab Collector Configuration
 * ==========================================
 */

import WATCHLIST from "./watchlist.js";
import TIMEFRAME from "./timeframe.js";

export default {

    /**
     * ======================================
     * Application
     * ======================================
     */

    app: {

        name: "InvestLab Collector",

        version: "1.0.0",

        timezone: "Asia/Jakarta"

    },

    /**
     * ======================================
     * TradingView
     * ======================================
     */

    tradingview: {

        reconnect: true,

        reconnectDelay: 5000,

        maxReconnect: 10

    },

    /**
     * ======================================
     * Collector
     * ======================================
     */

    collector: {

        watchlist: WATCHLIST.DEFAULT,

        timeframes: TIMEFRAME.DEFAULT,

        historyBars: 500,

        autoReconnect: true

    },

    /**
     * ======================================
     * Database
     * ======================================
     */

    database: {

        saveRealtime: true,

        batchInsert: false,

        batchSize: 100

    },

    /**
     * ======================================
     * Logger
     * ======================================
     */

    logger: {

        console: true,

        level: "info"

    },

    /**
     * ======================================
     * Indicator Engine
     * ======================================
     */

    indicator: {

        enabled: false,

        autoCalculate: false

    },

    /**
     * ======================================
     * AI Engine
     * ======================================
     */

    ai: {

        enabled: false

    }

};