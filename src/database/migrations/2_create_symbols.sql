CREATE TABLE IF NOT EXISTS symbols (

    id SERIAL PRIMARY KEY,
    market_id INT NOT NULL REFERENCES markets(id),
    symbol VARCHAR(20) NOT NULL,
    company_name VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (market_id, symbol)

);