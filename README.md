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
