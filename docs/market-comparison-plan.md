# Market comparison architecture

## Review and MVP sequence

1. Normalize provider event IDs, full team names, kickoff UTC, and paired moneylines.
2. Keep API credentials on the server. Fetch through The Odds API v4; use licensed access and confirm storage/display rights under the account agreement. Sportradar Odds Comparison is an alternative provider.
3. Persist immutable quote and prediction snapshots; validate before comparison.
4. Remove margin separately for each book, then calculate equal-weight median consensus.
5. Present neutral disagreement labels, book coverage, freshness and model factors.
6. Add spreads/totals only with corresponding model distributions; add history and evaluation after collecting real snapshots.

Provider references: https://the-odds-api.com/liveapi/guides/v4/ and https://developer.sportradar.com/odds/reference/intro.

## Method and quality risks

American odds must be finite and have absolute value at least 100. Positive odds imply 100/(odds+100); negative odds imply abs(odds)/(abs(odds)+100). For a two-outcome moneyline, normalize each probability by their sum. This proportional method is transparent but is an estimate, not a uniquely correct fair probability. NFL moneylines may void on a tie: interpret these as conditional on a decisive result, and require the model to use the same convention.

Use one latest complete pair per distinct book, exclude quotes older than 15 minutes or later than comparison time, and require both team identities to match. Calculate median, mean, min, max, range and population standard deviation of book-level home probabilities. Away consensus is the complement of home consensus. Report signed home probability gap in percentage points. Absolute gap intervals are [0,2), [2,5), [5,8), [8,infinity).

Reject comparisons after kickoff, with fewer than two valid books, missing/future prediction timestamps, or feature cutoff later than prediction time. A declared cutoff is an audit field, not proof that an upstream model pipeline is leakage-free. Provider outages, postponed games, correlated books, stale model inputs and unmodeled injuries can all make disagreements misleading. Model contributions explain the model; they cannot establish why the market priced differently.

## Database and API

See market-schema.sql for event, sportsbook, immutable quote, prediction and comparison records. Ingestion stores provider payload snapshots locally; production should normalize these into the schema with unique ingestion keys. Never overwrite earlier snapshots. Production predictions must reference provider event IDs explicitly; do not fuzzy-match games solely by team codes.

MVP endpoints: GET /games/upcoming, /predictions/{game_id}, /markets/{game_id}, /market-comparison/{game_id}, /market-scanner. The browser scanner filters team, book, confidence and minimum absolute gap; moneyline is the only supported MVP market. Sample mode is independent of the fictional predictor games. Live events without mapped predictions show a warning, never a fabricated model gap.

## Historical validation and later stages

Record model version, prediction time, feature cutoff, quote time, ingestion time and comparison time. At a historical decision time use only snapshots both published and ingested by that time. Never substitute closing prices for earlier quotes. Define closing as the last eligible complete snapshot strictly before kickoff; record missing closes and coverage. Opening means first observed quote, not necessarily a provider's actual opening line.

Use chronological train/validation/test seasons. Select thresholds using validation seasons, then freeze them for test seasons. Group absolute gaps into 0-2, 2-5, 5-8, 8-12 and 12+ points. For each group report count, classification accuracy, mean predicted probability, actual win rate, Brier score, calibration error and mean signed model-minus-closing probability. Use a consistent selected-team orientation for calibration. Also compare market and model Brier/log loss, and movement toward the model; bootstrap intervals clustered by week. Exclude or separately analyze ties under the declared moneyline convention. One game or closing convergence alone does not prove predictive value.

MVP 2 adds line snapshots and a movement chart; MVP 3 adds outcome joins and measured validation; MVP 4 adds scheduled ingestion and analytical discrepancy alerts. No wager recommendations or sizing.
