# NFL Prediction Plan

## Goal

Build a sports forecasting feature that predicts future NFL games from historical pre-game information. The system outputs home and away win probabilities, predicted winner, confidence tier, expected margin, optional score estimate, and model-derived explanation factors.

This product must not produce wagering recommendations.

## Pipeline

1. Ingest historical NFL games.
2. Clean and standardize team, player, quarterback, schedule, weather, and injury data.
3. Create one row per game.
4. Generate pre-game rolling features.
5. Create matchup features.
6. Split train, validation, and test sets chronologically.
7. Train baselines and ML models.
8. Calibrate probabilities.
9. Backtest on future-only windows.
10. Store predictions before kickoff.
11. Join actual results after games finish.
12. Monitor model performance over time.

## Leakage Prevention

Every feature needs an `available_before_game` rule.

Required rules:

- Use only games completed before kickoff.
- Compute last-3, last-5, season-to-date, and previous-season metrics with chronological windows.
- Do not use final season statistics to predict earlier games.
- Do not use future injury reports, future quarterback starts, or future performance.
- Store model inputs, prediction time, model version, and kickoff time for auditability.
- Rebuild backtests as if each prediction was made on the historical prediction date.

## Target Variables

### Win Probability

`home_team_win = 1` when the home team wins, otherwise `0`.

Primary metrics:

- Accuracy
- Log loss
- Brier score
- ROC-AUC
- Calibration by confidence bucket

### Point Differential

`home_score - away_score`

Use the predicted margin as the primary regression output. Exact score estimates can be shown, but the UI should make clear that margin is more reliable than exact scores.

## Feature Groups

All features below are pre-game snapshots.

### Team Performance

- Wins and losses
- Points scored and allowed
- Offensive rating
- Defensive rating
- Net points per game
- Turnover differential
- Third-down efficiency
- Red-zone efficiency
- Yards per play
- Strength of schedule
- Recent form

### Quarterback Performance

- Expected starting quarterback
- Passer rating
- Completion percentage
- EPA/play where licensed or derived
- Passing yards per attempt
- TD/INT ratio
- Sack rate
- Turnover rate
- Recent and career performance
- Games started

### Offense

- Passing efficiency
- Rushing efficiency
- EPA
- Success rate
- Offensive line proxy metrics when reliable
- Explosive plays

### Defense

- Defensive EPA
- Points allowed
- Yards allowed
- Pass defense
- Rush defense
- Sack rate
- Pressure rate
- Takeaways
- Opponent success rate

### Game Context

- Home or away
- Rest days
- Bye week
- Travel distance
- Divisional matchup
- Week of season
- Playoffs versus regular season
- Weather when available before kickoff
- Injuries when historical timestamps are reliable

## Matchup Features

Use matchup differences instead of relying only on raw stats.

- QB advantage = home QB efficiency minus away QB efficiency
- Offensive advantage = home offense rating minus away defensive rating
- Defensive advantage = home defensive rating minus away offensive rating
- Recent form difference = home last-5 performance minus away last-5 performance
- EPA difference = home EPA minus away EPA
- Turnover differential difference = home turnover margin minus away turnover margin
- Rest advantage = home rest days minus away rest days
- Strength-of-schedule adjusted performance difference

For each feature, store:

- Name
- Description
- Source columns
- Transformation logic
- `available_before_game` rule
- Missing-data behavior

## Model Development

Recommended order:

1. Home-team baseline
2. Elo baseline
3. Logistic regression
4. Random forest
5. Gradient-boosted trees such as XGBoost or LightGBM
6. Neural network only if it beats simpler models out of sample

Do not assume the most complex model is best.

## Chronological Validation

Example split:

- Train: 2010-2022
- Validation: 2023-2024
- Test: 2025

Add rolling backtests so each evaluation window only uses earlier games for training.

## Calibration

Report calibration buckets:

- 50-55%
- 55-60%
- 60-65%
- 65-70%
- 70-80%
- 80%+

For each bucket, show predicted probability versus actual win rate. If 70% predictions only win 60% of the time, the UI should expose that gap.

## Explainability

Explanations must come from model artifacts, not free-form invention.

Allowed sources:

- Logistic regression coefficients
- Tree feature importance
- SHAP values
- Permutation importance
- Stored feature contributions

The LLM layer may rewrite structured factors in plain English, but it must not independently decide who wins.

## Confidence Tiers

Confidence labels describe model signal, not certainty.

- 50-55%: Toss-up
- 55-62%: Slight edge
- 62-70%: Moderate
- 70%+: Strong model signal

Always show the underlying probability.

## Database Model

Core tables:

- `teams`
- `players`
- `quarterbacks`
- `games`
- `team_game_stats`
- `player_game_stats`
- `injuries`
- `weather`
- `team_ratings`
- `model_features`
- `model_predictions`
- `model_versions`

Prediction fields:

- `prediction_id`
- `game_id`
- `model_version`
- `created_at`
- `home_win_probability`
- `away_win_probability`
- `predicted_margin`
- `confidence`
- `top_positive_features`
- `top_negative_features`
- `actual_result`

## Live Weekly Workflow

1. Pull latest completed games.
2. Update team statistics.
3. Update quarterback statistics.
4. Generate rolling features.
5. Identify expected starting quarterbacks.
6. Add known injuries if supported.
7. Generate matchup features.
8. Run predictions.
9. Store predictions before games begin.
10. After games finish, store actual results.
11. Update model performance tracking.

## Monitoring

Track:

- Overall accuracy
- Log loss
- Brier score
- Calibration
- Performance by season
- Performance by confidence level
- Performance by team
- Performance by home/away
- Drift in feature distributions
