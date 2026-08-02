import { unixToISOString } from "./date.js";

export function normalizeCandle(symbol, timeframe, candle) {

    return {

        market: "IDX",
        symbol,
        timeframe,
        datetime: unixToISOString(candle.time),
        timestamp: candle.time,
        
        open: candle.open,
        high: candle.max,
        low: candle.min,
        close: candle.close,

        volume: candle.volume,
        source: "TradingView"

    };

}