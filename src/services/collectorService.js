import logger from "../utils/logger.js";
import repository from "../database/repository.js";
import dispatcher from "../events/dispatcher.js";

class CollectorService {

    async handleCandle(candle) {

        try {

            /**
             * =====================================
             * GET / CREATE MARKET
             * =====================================
             */

            const market = await repository.getOrCreateMarket(
                candle.market
            );

            /**
             * =====================================
             * GET / CREATE SYMBOL
             * =====================================
             */

            const symbol = await repository.getOrCreateSymbol(
                market.id,
                candle.symbol
            );

            /**
             * =====================================
             * DISPATCH EVENT
             * =====================================
             */

            await dispatcher.emit(
                "candle.updated",
                {

                    market,

                    symbol,

                    candle

                }
            );

            /**
             * =====================================
             * LOG
             * =====================================
             */

            logger.info({

                event: "NEW_CANDLE",

                market: candle.market,

                symbol: candle.symbol,

                timeframe: candle.timeframe,

                datetime: candle.datetime,

                close: candle.close,

                volume: candle.volume

            });

        }

        catch (err) {

            logger.error({

                event: "COLLECTOR_ERROR",

                message: err.message,

                stack: err.stack

            });

        }

    }

}

export default new CollectorService();