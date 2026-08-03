import dispatcher from "../dispatcher.js";
import repository from "../../database/repository.js";

dispatcher.on(
    "candle.updated",
    async ({ symbol, candle }) => {

        await repository.saveCandle(
            symbol.id,
            candle
        );

    }
);