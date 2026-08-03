/**
 * ==========================================
 * Timeframe Configuration
 * ==========================================
 */

export default {

    /**
     * Default Timeframe
     */

    DEFAULT: [

        {
            timeframe: "D",
            range: 500
        }

    ],

    /**
     * Swing Trading
     */

    SWING: [

        {
            timeframe: "D",
            range: 1000
        },

        {
            timeframe: "W",
            range: 300
        }

    ],

    /**
     * Intraday
     */

    INTRADAY: [

        {
            timeframe: "15",
            range: 1000
        },

        {
            timeframe: "60",
            range: 1000
        },

        {
            timeframe: "D",
            range: 500
        }

    ],

    /**
     * Full Analysis
     */

    FULL: [

        {
            timeframe: "15",
            range: 1500
        },

        {
            timeframe: "60",
            range: 1000
        },

        {
            timeframe: "D",
            range: 1000
        },

        {
            timeframe: "W",
            range: 500
        }

    ]

};