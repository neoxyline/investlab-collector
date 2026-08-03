/**
 * ==========================================
 * RSI (Relative Strength Index)
 * ==========================================
 *
 * InvestLab Indicator Engine
 *
 * Wilder's RSI
 *
 * Usage:
 *
 * const rsi14 = RSI.calculate(closes, 14);
 *
 * const series = RSI.series(closes, 14);
 *
 */

class RSI {

    /**
     * =====================================
     * Hitung seluruh RSI Series
     * =====================================
     */

    static series(values, period = 14) {

        if (!Array.isArray(values)) {
            throw new Error("RSI: values must be an array.");
        }

        if (values.length <= period) {
            return [];
        }

        const rsi = [];

        let gain = 0;
        let loss = 0;

        /**
         * First Average Gain/Loss
         */

        for (let i = 1; i <= period; i++) {

            const change = values[i] - values[i - 1];

            if (change > 0) {

                gain += change;

            } else {

                loss += Math.abs(change);

            }

        }

        let avgGain = gain / period;
        let avgLoss = loss / period;

        if (avgLoss === 0) {

            rsi[period] = 100;

        } else {

            const rs = avgGain / avgLoss;

            rsi[period] =

                100 - (100 / (1 + rs));

        }

        /**
         * Wilder Smoothing
         */

        for (let i = period + 1; i < values.length; i++) {

            const change = values[i] - values[i - 1];

            const currentGain =

                change > 0 ? change : 0;

            const currentLoss =

                change < 0 ? Math.abs(change) : 0;

            avgGain =

                ((avgGain * (period - 1)) + currentGain)

                / period;

            avgLoss =

                ((avgLoss * (period - 1)) + currentLoss)

                / period;

            if (avgLoss === 0) {

                rsi[i] = 100;

                continue;

            }

            const rs = avgGain / avgLoss;

            rsi[i] =

                100 - (100 / (1 + rs));

        }

        return rsi;

    }

    /**
     * =====================================
     * RSI terakhir
     * =====================================
     */

    static calculate(values, period = 14) {

        const series = this.series(values, period);

        if (!series.length) {

            return null;

        }

        return series[series.length - 1];

    }

    /**
     * =====================================
     * RSI pada index tertentu
     * =====================================
     */

    static at(values, period, index) {

        const series = this.series(values, period);

        return series[index] ?? null;

    }

    /**
     * =====================================
     * Ambil beberapa RSI terakhir
     * =====================================
     */

    static last(values, period, count = 5) {

        const series = this.series(values, period);

        return series

            .filter(v => v !== undefined)

            .slice(-count);

    }

}

export default RSI;