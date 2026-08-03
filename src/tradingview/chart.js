import client from "./client.js";
import { normalizeCandle } from "../utils/normalizeCandle.js";
import collectorService from "../services/collectorService.js";

export function createChart(
    symbol,
    timeframe = "D",
    range = 500
) {

    const chart = new client.Session.Chart();

    chart.setMarket(symbol, {
        timeframe,
        range
    });

    chart.onError((...err) => {

        console.error("Chart Error:", ...err);

    });

    chart.onSymbolLoaded(() => {

        console.log("====================================");
        console.log("Market Loaded");
        console.log(chart.infos.description);
        console.log(`Timeframe : ${timeframe}`);
        console.log(`History   : ${range} candles`);
        console.log("====================================");

    });

    chart.onUpdate(async () => {

        if (!chart.periods.length) {
            return;
        }

        const candle = normalizeCandle(
            symbol,
            timeframe,
            chart.periods[0]
        );

        await collectorService.handleCandle(candle);

    });

    return chart;

}