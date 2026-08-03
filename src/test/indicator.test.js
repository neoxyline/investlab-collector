import EMA from "../indicators/ema.js";
import SMA from "../indicators/sma.js";
import RSI from "../indicators/rsi.js";
import MACD from "../indicators/macd.js";
import ATR from "../indicators/atr.js";
import Bollinger from "../indicators/bollinger.js";

/**
 * =====================================
 * Dummy OHLC Data
 * =====================================
 */

const highs = [];
const lows = [];
const closes = [];

for (let i = 100; i <= 200; i++) {

    highs.push(i + 2);

    lows.push(i - 2);

    closes.push(i);

}

console.log("=================================");
console.log("Indicator Test");
console.log("=================================");

console.log("EMA20");
console.log(
    EMA.calculate(closes, 20)
);

console.log("");

console.log("SMA20");
console.log(
    SMA.calculate(closes, 20)
);

console.log("");

console.log("RSI14");
console.log(
    RSI.calculate(closes, 14)
);

console.log("");

console.log("MACD");
console.log(
    MACD.calculate(closes)
);

console.log("");

console.log("ATR14");
console.log(
    ATR.calculate(
        highs,
        lows,
        closes
    )
);

console.log("");

console.log("Bollinger");
console.log(
    Bollinger.calculate(closes)
);

console.log("=================================");