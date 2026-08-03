CREATE TABLE IF NOT EXISTS indicators (

    id BIGSERIAL PRIMARY KEY,

    symbol_id INTEGER NOT NULL REFERENCES symbols(id),

    timeframe VARCHAR(5) NOT NULL,

    candle_time TIMESTAMP NOT NULL,

    ema20 NUMERIC(18,6),

    ema50 NUMERIC(18,6),

    ema200 NUMERIC(18,6),

    sma20 NUMERIC(18,6),

    rsi14 NUMERIC(18,6),

    macd NUMERIC(18,6),

    macd_signal NUMERIC(18,6),

    macd_histogram NUMERIC(18,6),

    atr14 NUMERIC(18,6),

    bb_upper NUMERIC(18,6),

    bb_middle NUMERIC(18,6),

    bb_lower NUMERIC(18,6),

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (

        symbol_id,

        timeframe,

        candle_time

    )

);