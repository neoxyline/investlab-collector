import { createChart } from "./src/tradingview/chart.js";
import SYMBOLS from "./src/config/symbols.js";

console.log("=================================");
console.log("InvestLab Collector Started");
console.log("=================================");

// Ganti mode di sini
const WATCHLIST = SYMBOLS.DEFAULT;
// const WATCHLIST = SYMBOLS.TEST;
// const WATCHLIST = SYMBOLS.LQ45;

for (const item of WATCHLIST) {

    createChart(
        item.symbol,
        item.timeframe
    );

}