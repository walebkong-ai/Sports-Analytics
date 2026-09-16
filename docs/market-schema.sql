PRAGMA foreign_keys = ON;
CREATE TABLE games (id TEXT PRIMARY KEY, source TEXT NOT NULL, home TEXT NOT NULL, away TEXT NOT NULL, kickoff TEXT NOT NULL);
CREATE TABLE sportsbooks (id TEXT PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE sportsbook_odds (
 id INTEGER PRIMARY KEY, sportsbook TEXT NOT NULL REFERENCES sportsbooks(id),
 game_id TEXT NOT NULL REFERENCES games(id), market_type TEXT NOT NULL,
 selection TEXT NOT NULL, american_odds REAL NOT NULL CHECK(abs(american_odds)>=100),
 spread_or_total REAL, implied_probability REAL NOT NULL CHECK(implied_probability BETWEEN 0 AND 1),
 timestamp TEXT NOT NULL, ingested_at TEXT NOT NULL, source TEXT NOT NULL,
 UNIQUE(sportsbook,game_id,market_type,selection,timestamp)
);
CREATE TABLE predictions (
 id INTEGER PRIMARY KEY, game_id TEXT NOT NULL REFERENCES games(id), model_version TEXT NOT NULL,
 home_probability REAL NOT NULL CHECK(home_probability BETWEEN 0 AND 1),
 prediction_timestamp TEXT NOT NULL, feature_cutoff TEXT NOT NULL,
 probability_basis TEXT NOT NULL CHECK(probability_basis='decisive_result'),
 UNIQUE(game_id,model_version,prediction_timestamp)
);
CREATE TABLE market_consensus (
 id INTEGER PRIMARY KEY, game_id TEXT NOT NULL REFERENCES games(id), market_type TEXT NOT NULL,
 timestamp TEXT NOT NULL, consensus_probability REAL NOT NULL, mean_probability REAL NOT NULL,
 probability_low REAL NOT NULL, probability_high REAL NOT NULL, dispersion REAL NOT NULL, book_count INTEGER NOT NULL
);
CREATE TABLE model_market_comparison (
 id INTEGER PRIMARY KEY, prediction_id INTEGER NOT NULL REFERENCES predictions(id),
 consensus_id INTEGER NOT NULL REFERENCES market_consensus(id), comparison_timestamp TEXT NOT NULL,
 model_probability REAL NOT NULL, market_probability REAL NOT NULL, probability_gap REAL NOT NULL
);
CREATE INDEX quote_lookup ON sportsbook_odds(game_id,market_type,timestamp);
