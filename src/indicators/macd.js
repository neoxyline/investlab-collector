/**
 * ==========================================
 * MACD (Moving Average Convergence Divergence)
 * ==========================================
 *
 * InvestLab Indicator Engine
 *
 * Default:
 * Fast EMA   : 12
 * Slow EMA   : 26
 * Signal EMA : 9
 *
 * Usage:
 *
 * const macd = MACD.calculate(closes);
 * const series = MACD.series(closes);
 *
 */

import EMA from "./ema.js";

class MACD {

    /**
     * =====================================
     * Hitung seluruh MACD Series
     * =====================================
     */

    static series(

        values,

        fastPeriod = 12,

        slowPeriod = 26,

        signalPeriod = 9

    ) {

        if (!Array.isArray(values)) {
            throw new Error("MACD: values must be an array.");
        }

        if (values.length < slowPeriod) {
            return [];
        }

        const fastEMA = EMA.series(values, fastPeriod);

        const slowEMA = EMA.series(values, slowPeriod);

        const macdLine = [];

        /**
         * MACD Line
         */

        for (let i = 0; i < values.length; i++) {

            if (

                fastEMA[i] === undefined ||

                slowEMA[i] === undefined

            ) {

                continue;

            }

            macdLine[i] =

                fastEMA[i] - slowEMA[i];

        }

        /**
         * Signal Line
         */

        const macdValues = macdLine.filter(

            v => v !== undefined

        );

        const signalValues = EMA.series(

            macdValues,

            signalPeriod

        );

        const result = [];

        let signalIndex = 0;

        for (let i = 0; i < macdLine.length; i++) {

            if (macdLine[i] === undefined) {

                continue;

            }

            const signal = signalValues[signalIndex];

            if (signal !== undefined) {

                result[i] = {

                    macd: macdLine[i],

                    signal,

                    histogram:

                        macdLine[i] - signal

                };

            }

            signalIndex++;

        }

        return result;

    }

    /**
     * =====================================
     * MACD Terakhir
     * =====================================
     */

    static calculate(

        values,

        fastPeriod = 12,

        slowPeriod = 26,

        signalPeriod = 9

    ) {

        const series = this.series(

            values,

            fastPeriod,

            slowPeriod,

            signalPeriod

        );

        if (!series.length) {

            return null;

        }

        return series[series.length - 1];

    }

    /**
     * =====================================
     * MACD pada Index
     * =====================================
     */

    static at(

        values,

        index,

        fastPeriod = 12,

        slowPeriod = 26,

        signalPeriod = 9

    ) {

        const series = this.series(

            values,

            fastPeriod,

            slowPeriod,

            signalPeriod

        );

        return series[index] ?? null;

    }

    /**
     * =====================================
     * Ambil beberapa MACD terakhir
     * =====================================
     */

    static last(

        values,

        count = 5,

        fastPeriod = 12,

        slowPeriod = 26,

        signalPeriod = 9

    ) {

        const series = this.series(

            values,

            fastPeriod,

            slowPeriod,

            signalPeriod

        );

        return series

            .filter(Boolean)

            .slice(-count);

    }

}

export default MACD;