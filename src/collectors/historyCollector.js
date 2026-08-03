class HistoryCollector {

    async start(watchlist) {

        console.log("");
        console.log("=================================");
        console.log("History Collector Started");
        console.log("=================================");

        for (const stock of watchlist) {

            console.log("");

            console.log(
                `Loading ${stock.symbol}...`
            );

            for (const timeframe of stock.timeframes) {

                console.log(
                    `  Timeframe ${timeframe}`
                );

                // nanti fetch history

            }

        }

        console.log("");
        console.log("History Collector Finished");

    }

}

export default new HistoryCollector();