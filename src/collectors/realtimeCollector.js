import collectorConfig from "../config/collector.js";
import tvManager from "../tradingview/manager.js";

class RealtimeCollector {

    async start() {

        console.log("");
        console.log("=================================");
        console.log("Realtime Collector Started");
        console.log("=================================");

        const watchlist =
            collectorConfig.collector.watchlist;

        const timeframes =
            collectorConfig.collector.timeframes;

        let total = 0;

        for (const symbol of watchlist) {

            for (const tf of timeframes) {

                console.log(
                    `Loading ${symbol} [${tf.timeframe}]`
                );

                tvManager.create(

                    symbol,

                    tf.timeframe,

                    tf.range

                );

                total++;

            }

        }

        console.log("");
        console.log("---------------------------------");
        console.log(`Charts Loaded : ${total}`);
        console.log("---------------------------------");

        tvManager.printStats();

    }

}

export default new RealtimeCollector();