import postgres from "./postgres.js";

class Repository {

    /**
     * ===================================
     * Generic Query
     * ===================================
     */
    async query(sql, params = []) {
        return postgres.query(sql, params);
    }

    /**
     * ===================================
     * MARKET
     * ===================================
     */

    async getOrCreateMarket(code) {

        const result = await this.query(
            `
            INSERT INTO markets (
                code,
                name
            )
            VALUES (
                $1,
                $2
            )

            ON CONFLICT (code)

            DO UPDATE SET
                name = EXCLUDED.name

            RETURNING *;
            `,
            [
                code,
                code
            ]
        );

        return result.rows[0];

    }

    /**
     * ===================================
     * SYMBOL
     * ===================================
     */

    async getOrCreateSymbol(
        marketId,
        symbol,
        companyName = null
    ) {

        const result = await this.query(
            `
            INSERT INTO symbols (

                market_id,

                symbol,

                company_name

            )

            VALUES (

                $1,

                $2,

                $3

            )

            ON CONFLICT (

                market_id,

                symbol

            )

            DO UPDATE SET

                company_name =
                    COALESCE(
                        EXCLUDED.company_name,
                        symbols.company_name
                    )

            RETURNING *;
            `,
            [
                marketId,
                symbol,
                companyName
            ]
        );

        return result.rows[0];

    }

    /**
     * ===================================
     * CANDLE
     * ===================================
     */

    async saveCandle(symbolId, candle) {

        await this.query(
            `
            INSERT INTO candles (

                symbol_id,

                timeframe,

                candle_time,

                open,

                high,

                low,

                close,

                volume,

                source,

                received_at

            )

            VALUES (

                $1,

                $2,

                $3,

                $4,

                $5,

                $6,

                $7,

                $8,

                $9,

                NOW()

            )

            ON CONFLICT (

                symbol_id,

                timeframe,

                candle_time

            )

            DO NOTHING;
            `,
            [
                symbolId,
                candle.timeframe,
                candle.datetime,
                candle.open,
                candle.high,
                candle.low,
                candle.close,
                candle.volume,
                candle.source
            ]
        );

    }

}

export default new Repository();