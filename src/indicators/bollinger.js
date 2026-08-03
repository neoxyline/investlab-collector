/**
 * ==========================================
 * Bollinger Bands
 * ==========================================
 *
 * InvestLab Indicator Engine
 *
 * Default:
 * Period : 20
 * StdDev : 2
 *
 * Usage:
 *
 * const bb = Bollinger.calculate(closes);
 *
 * const series = Bollinger.series(closes);
 *
 */

import SMA from "./sma.js";

class Bollinger {

    /**
     * =====================================
     * Standard Deviation
     * =====================================
     */

    static standardDeviation(values) {

        const mean =
            values.reduce((a, b) => a + b, 0) / values.length;

        let variance = 0;

        for (const value of values) {

            variance += Math.pow(value - mean, 2);

        }

        variance /= values.length;

        return Math.sqrt(variance);

    }

    /**
     * =====================================
     * Calculate Series
     * =====================================
     */

    static series(
        values,
        period = 20,
        multiplier = 2
    ) {

        if (!Array.isArray(values)) {
            throw new Error(
                "Bollinger: values must be an array."
            );
        }

        if (values.length < period) {
            return [];
        }

        const sma = SMA.series(values, period);

        const result = [];

        for (
            let i = period - 1;
            i < values.length;
            i++
        ) {

            const slice = values.slice(
                i - period + 1,
                i + 1
            );

            const std =
                this.standardDeviation(slice);

            const middle = sma[i];

            result[i] = {

                upper:

                    middle +

                    (std * multiplier),

                middle,

                lower:

                    middle -

                    (std * multiplier),

                bandwidth:

                    ((std * multiplier * 2) / middle) * 100,

                percentB:

                    (values[i] -

                        (middle - std * multiplier))

                    /

                    ((std * multiplier) * 2)

            };

        }

        return result;

    }

    /**
     * =====================================
     * Last Value
     * =====================================
     */

    static calculate(
        values,
        period = 20,
        multiplier = 2
    ) {

        const series = this.series(
            values,
            period,
            multiplier
        );

        if (!series.length) {

            return null;

        }

        return series[series.length - 1];

    }

    /**
     * =====================================
     * Value at Index
     * =====================================
     */

    static at(
        values,
        period,
        index,
        multiplier = 2
    ) {

        const series = this.series(
            values,
            period,
            multiplier
        );

        return series[index] ?? null;

    }

    /**
     * =====================================
     * Last n Values
     * =====================================
     */

    static last(
        values,
        count = 5,
        period = 20,
        multiplier = 2
    ) {

        const series = this.series(
            values,
            period,
            multiplier
        );

        return series
            .filter(Boolean)
            .slice(-count);

    }

}

export default Bollinger;