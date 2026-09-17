# NFL Game Predictor

A no-leakage NFL game prediction prototype. The current app is dependency-free and uses sample pre-game feature snapshots so the product workflow can be reviewed before connecting a real historical data pipeline.

## What the app shows

- Team A and Team B win probabilities
- Predicted winner
- Objective confidence tier
- Predicted margin and a cautious score estimate
- Feature contributions behind the prediction
- Team comparison table
- Out-of-sample model history
- Calibration buckets
- Leakage guardrails

The app is not a wagering product and does not provide betting recommendations.

## Run it

Open `index.html` in a browser. No install step is required.

## Market comparison MVP

### Live connections

Use Node 22+ and Python 3.9+. Create a local `.env` using `.env.example`, and enter your own key from https://the-odds-api.com/.
Run `npm run model:refresh` to download nflverse completed results and create timestamped Elo baseline predictions, then `npm start`.
Open http://127.0.0.1:4174/market.html (the example configuration uses port 4174).
The key stays on the server; `.env` and downloaded snapshots are ignored by Git.
GET `/api/model-status` reports credential presence, baseline predictions and measured sequential validation without revealing the key.

The generated baseline matches provider games by exact full team names and kickoff within one minute, requires a unique match, and expires after 24 hours. Refresh before comparing. A postponed or unmatched event receives no fabricated prediction.
The model uses fixed Elo parameters, completed results before today's Eastern date, home field and offseason regression. It excludes all odds, today's scores, injuries, weather and QB inputs. This is an initial baseline, not the richer model described above.
Validation uses revised public results and therefore is not a historically archived, point-in-time backtest. Historical market comparisons still need archived quotes and predictions.

Run `node server.cjs` (Node 20+) and open http://127.0.0.1:4173/market.html.
Without credentials the scanner uses explicitly synthetic quotes and a sample prediction.
Set `ODDS_API_KEY` in the server environment to fetch The Odds API NFL moneylines.
Set `PREDICTIONS_FILE` to a JSON array of mapped model predictions with:
`gameId`, `homeProbability`, `timestamp`, `featureCutoff`, `probabilityBasis` (must be `decisive_result`), `modelVersion`, `confidence`, `factors`, and optional `uncertainties`.
Use provider event IDs, UTC ISO timestamps and probabilities between zero and one.
The existing predictor remains a static prototype; it is not automatically mapped to live events.
Live games without valid mapped predictions show data quality warnings.
API endpoints use the `/api` prefix. Provider payload and prediction snapshots are saved to ignored `.market-data/` files; the SQL schema documents the production normalized database.
See [the architecture and validation plan](docs/market-comparison-plan.md).

## Modeling approach

Start simple and compare models chronologically:

1. Home-team baseline
2. Elo baseline
3. Logistic regression
4. Random forest
5. Gradient-boosted trees

Do not randomly split games. Train on older seasons, validate on later seasons, and test on seasons that occur after the training window.

## Hard rule: prevent data leakage

For a Week 10 game, features may only use information known before that game starts. Never use final season statistics, future injury information, future quarterback performance, or rankings generated after kickoff.

See [docs/nfl-prediction-plan.md](docs/nfl-prediction-plan.md) for the full pipeline, database model, feature rules, and live prediction workflow.
