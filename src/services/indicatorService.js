import {
    EMA,
    SMA,
    RSI,
    MACD,
    Bollinger
} from "../indicators/index.js";

class IndicatorService {
  constructor() {
    this.indicators = [EMA, SMA, RSI, MACD, Bollinger];
  }

  async getIndicators() {
    return {
      status: 'ok',
      indicators: this.indicators.map((indicator) => indicator.name),
    };
  }
}

export { IndicatorService };
export default new IndicatorService();
