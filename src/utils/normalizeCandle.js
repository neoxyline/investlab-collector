import { unixToISOString } from "./date.js";

export function normalizeCandle(symbol, timeframe, candle) {

    const [market, ticker] = symbol.split(":");

    return {

        market,
        symbol: ticker,

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