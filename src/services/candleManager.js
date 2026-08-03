/**
 * ==========================================
 * Candle Manager
 * ==========================================
 *
 * Menyimpan candle terakhir di memory.
 * Hanya mengembalikan candle ketika candle
 * sebelumnya sudah benar-benar selesai.
 */

class CandleManager {

    constructor() {

        /**
         * key = SYMBOL_TIMEFRAME
         */
        this.cache = new Map();

    }

    /**
     * ======================================
     * Generate Key
     * ======================================
     */

    makeKey(symbol, timeframe) {

        return `${symbol}_${timeframe}`;

    }

    /**
     * ======================================
     * Process Candle
     * ======================================
     *
     * Return:
     *  - null            => candle masih berjalan
     *  - closed candle   => candle sebelumnya selesai
     */

    process(candle) {

        const key = this.makeKey(

            candle.symbol,

            candle.timeframe

        );

        /**
         * pertama kali
         */

        if (!this.cache.has(key)) {

            this.cache.set(

                key,

                { ...candle }

            );

            return null;

        }

        const previous = this.cache.get(key);

        /**
         * masih candle yang sama
         */

        if (previous.timestamp === candle.timestamp) {

            this.cache.set(

                key,

                { ...candle }

            );

            return null;

        }

        /**
         * timestamp berubah
         * berarti candle lama selesai
         */

        const closedCandle = {

            ...previous

        };

        this.cache.set(

            key,

            { ...candle }

        );

        return closedCandle;

    }

    /**
     * ======================================
     * Get Last Candle
     * ======================================
     */

    get(symbol, timeframe) {

        return this.cache.get(

            this.makeKey(

                symbol,

                timeframe

            )

        ) ?? null;

    }

    /**
     * ======================================
     * Clear
     * ======================================
     */

    clear() {

        this.cache.clear();

    }

    /**
     * ======================================
     * Total Cached Candle
     * ======================================
     */

    count() {

        return this.cache.size;

    }

}

export default new CandleManager();