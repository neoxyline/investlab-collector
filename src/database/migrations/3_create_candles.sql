CREATE TABLE IF NOT EXISTS candles (

    id BIGSERIAL PRIMARY KEY,
    symbol_id INT NOT NULL REFERENCES symbols(id),
    timeframe VARCHAR(5) NOT NULL,
    candle_time TIMESTAMP NOT NULL,
    open NUMERIC(18,4),
    high NUMERIC(18,4),
    low NUMERIC(18,4),
    close NUMERIC(18,4),
    volume BIGINT,
    source VARCHAR(30),
    received_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(symbol_id,timeframe,candle_time)
);