/**
 * ==========================================
 * SMA (Simple Moving Average)
 * ==========================================
 *
 * InvestLab Indicator Engine
 *
 * Usage:
 *
 * const sma20 = SMA.calculate(closes, 20);
 *
 * const allSMA20 = SMA.series(closes, 20);
 *
 */

class SMA {

    /**
     * =====================================
     * Hitung seluruh SMA Series
     * =====================================
     */

    static series(values, period = 20) {

        if (!Array.isArray(values)) {
            throw new Error("SMA: values must be an array.");
        }

        if (values.length < period) {
            return [];
        }

        const sma = [];

        for (let i = period - 1; i < values.length; i++) {

            let total = 0;

            for (let j = i - period + 1; j <= i; j++) {

                total += values[j];

            }

            sma[i] = total / period;

        }

        return sma;

    }

    /**
     * =====================================
     * SMA terakhir
     * =====================================
     */

    static calculate(values, period = 20) {

        const sma = this.series(values, period);

        if (!sma.length) {

            return null;

        }

        return sma[sma.length - 1];

    }

    /**
     * =====================================
     * SMA pada index tertentu
     * =====================================
     */

    static at(values, period, index) {

        const sma = this.series(values, period);

        return sma[index] ?? null;

    }

    /**
     * =====================================
     * Ambil beberapa SMA terakhir
     * =====================================
     */

    static last(values, period, count = 5) {

        const sma = this.series(values, period);

        return sma

            .filter(v => v !== undefined)

            .slice(-count);

    }

}

export default SMA;