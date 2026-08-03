/**
 * ==========================================
 * ATR (Average True Range)
 * ==========================================
 *
 * InvestLab Indicator Engine
 *
 * Wilder ATR
 *
 * Default Period : 14
 *
 * Usage:
 *
 * const atr = ATR.calculate(highs, lows, closes);
 *
 */

class ATR {

    /**
     * =====================================
     * True Range Series
     * =====================================
     */

    static trueRange(highs, lows, closes) {

        if (
            highs.length !== lows.length ||
            highs.length !== closes.length
        ) {
            throw new Error(
                "ATR: highs, lows and closes must have same length."
            );
        }

        const tr = [];

        tr[0] = highs[0] - lows[0];

        for (let i = 1; i < highs.length; i++) {

            const hl = highs[i] - lows[i];

            const hc = Math.abs(
                highs[i] - closes[i - 1]
            );

            const lc = Math.abs(
                lows[i] - closes[i - 1]
            );

            tr[i] = Math.max(
                hl,
                hc,
                lc
            );

        }

        return tr;

    }

    /**
     * =====================================
     * ATR Series
     * =====================================
     */

    static series(

        highs,

        lows,

        closes,

        period = 14

    ) {

        const tr = this.trueRange(
            highs,
            lows,
            closes
        );

        if (tr.length < period) {

            return [];

        }

        const atr = [];

        /**
         * First ATR (SMA)
         */

        let sum = 0;

        for (let i = 0; i < period; i++) {

            sum += tr[i];

        }

        atr[period - 1] =

            sum / period;

        /**
         * Wilder Smoothing
         */

        for (

            let i = period;

            i < tr.length;

            i++

        ) {

            atr[i] =

                (

                    atr[i - 1] *

                    (period - 1)

                    +

                    tr[i]

                )

                /

                period;

        }

        return atr;

    }

    /**
     * =====================================
     * Last ATR
     * =====================================
     */

    static calculate(

        highs,

        lows,

        closes,

        period = 14

    ) {

        const atr = this.series(

            highs,

            lows,

            closes,

            period

        );

        if (!atr.length) {

            return null;

        }

        return atr[atr.length - 1];

    }

    /**
     * =====================================
     * ATR at index
     * =====================================
     */

    static at(

        highs,

        lows,

        closes,

        period,

        index

    ) {

        const atr = this.series(

            highs,

            lows,

            closes,

            period

        );

        return atr[index] ?? null;

    }

    /**
     * =====================================
     * Last N ATR
     * =====================================
     */

    static last(

        highs,

        lows,

        closes,

        count = 5,

        period = 14

    ) {

        const atr = this.series(

            highs,

            lows,

            closes,

            period

        );

        return atr

            .filter(v => v !== undefined)

            .slice(-count);

    }

}

export default ATR;