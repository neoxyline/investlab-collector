import TradingView from "@mathieuc/tradingview";
import env from "../config/env.js";

const client = new TradingView.Client({
    token: env.session,
    signature: env.signature
});

export default client;