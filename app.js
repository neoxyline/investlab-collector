import collectorConfig from "./src/config/collector.js";
import tvManager from "./src/tradingview/manager.js";

const mode = (process.argv[2] || "realtime").toLowerCase();

console.clear();

console.log("=================================");
console.log(`${collectorConfig.app.name}`);
console.log(`Version : ${collectorConfig.app.version}`);
console.log(`Mode    : ${mode}`);
console.log("=================================");

try {

    switch (mode) {

        /**
         * =====================================
         * Realtime Collector
         * =====================================
         */
        case "realtime": {

            const { default: realtimeCollector } =
                await import("./src/collectors/realtimeCollector.js");

            await realtimeCollector.start();

            break;
        }

        /**
         * =====================================
         * History Collector
         * =====================================
         */
        case "history": {

            const { default: historyCollector } =
                await import("./src/collectors/historyCollector.js");

            await historyCollector.start();

            break;
        }

        /**
         * =====================================
         * Indicator Engine
         * =====================================
         */
        case "indicator": {

            const { default: indicatorCollector } =
                await import("./src/collectors/indicatorCollector.js");

            await indicatorCollector.run();

            break;
        }

        default:

            console.error("");
            console.error("Unknown mode :", mode);
            console.error("");
            console.error("Available mode:");
            console.error("  npm start");
            console.error("  node app.js realtime");
            console.error("  node app.js history");
            console.error("  node app.js indicator");
            process.exit(1);

    }

} catch (err) {

    console.error("");
    console.error("=================================");
    console.error("Application Error");
    console.error("=================================");
    console.error(err);
    process.exit(1);

}

/**
 * =====================================
 * Graceful Shutdown
 * =====================================
 */

process.on("SIGINT", () => {

    console.log("");
    console.log("=================================");
    console.log("Stopping InvestLab...");
    console.log("=================================");

    tvManager.clear();

    process.exit(0);

});

process.on("SIGTERM", () => {

    console.log("");
    console.log("=================================");
    console.log("Stopping InvestLab...");
    console.log("=================================");

    tvManager.clear();

    process.exit(0);

});