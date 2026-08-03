/**
 * ==========================================
 * EMA (Exponential Moving Average)
 * ==========================================
 *
 * InvestLab Indicator Engine
 *
 * Usage:
 *
 * const ema20 = EMA.calculate(closes, 20);
 *
 * const allEMA20 = EMA.series(closes, 20);
 *
 */

class EMA {

    /**
     * =====================================
     * Hitung seluruh EMA Series
     * =====================================
     */

    static series(values, period = 20) {

        if (!Array.isArray(values)) {
            throw new Error("EMA: values must be an array.");
        }

        if (values.length < period) {
            return [];
        }

        const multiplier = 2 / (period + 1);

        const ema = [];

        /**
         * EMA pertama menggunakan SMA
         */

        let sma = 0;

        for (let i = 0; i < period; i++) {

            sma += values[i];

        }

        sma /= period;

        ema[period - 1] = sma;

        /**
         * EMA berikutnya
         */

        for (let i = period; i < values.length; i++) {

            ema[i] =

                ((values[i] - ema[i - 1]) * multiplier)

                +

                ema[i - 1];

        }

        return ema;

    }

    /**
     * =====================================
     * EMA terakhir
     * =====================================
     */

    static calculate(values, period = 20) {

        const ema = this.series(values, period);

        if (!ema.length) {

            return null;

        }

        return ema[ema.length - 1];

    }

    /**
     * =====================================
     * EMA pada index tertentu
     * =====================================
     */

    static at(values, period, index) {

        const ema = this.series(values, period);

        return ema[index] ?? null;

    }

    /**
     * =====================================
     * Ambil beberapa EMA terakhir
     * =====================================
     */

    static last(values, period, count = 5) {

        const ema = this.series(values, period);

        return ema

            .filter(v => v !== undefined)

            .slice(-count);

    }

}

export default EMA;