import logger from "../utils/logger.js";

class CollectorService {

    async handleCandle(candle) {

        logger.info({
            event: "NEW_CANDLE",
            symbol: candle.symbol,
            timeframe: candle.timeframe,
            datetime: candle.datetime,
            close: candle.close,
            volume: candle.volume
        });

        // Phase 4
        // await repository.saveCandle(candle);

        // Phase 5
        // await indicatorEngine.calculate(candle);

        // Phase 6
        // await aiEngine.process(candle);

    }

}

export default new CollectorService();
