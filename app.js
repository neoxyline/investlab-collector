import { createChart } from "./src/tradingview/chart.js";
import symbols from "./src/config/symbols.js";

console.log("=================================");
console.log("InvestLab Collector Started");
console.log("=================================");

symbols.forEach(item => {
    createChart(item.symbol, item.timeframe);
});