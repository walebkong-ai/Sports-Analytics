const games = [
  {
    id: "buf-bal-2026w01",
    season: 2026,
    week: 1,
    away: {
      code: "BAL",
      name: "Baltimore",
      qb: "Lamar Jackson",
      expectedPoints: 23.4,
      metrics: {
        elo: 1648,
        qbEpa: 0.19,
        qbRating: 101.2,
        offenseEpa: 0.11,
        defenseEpaAllowed: -0.04,
        yardsPerPlay: 5.8,
        rushSuccess: 46.8,
        passSuccess: 47.1,
        turnoverMargin: 0.21,
        restDays: 8,
        recentForm: 3.6,
        strengthOfSchedule: 0.9,
      },
    },
    home: {
      code: "BUF",
      name: "Buffalo",
      qb: "Josh Allen",
      expectedPoints: 26.9,
      metrics: {
        elo: 1664,
        qbEpa: 0.23,
        qbRating: 104.4,
        offenseEpa: 0.14,
        defenseEpaAllowed: -0.06,
        yardsPerPlay: 5.9,
        rushSuccess: 43.5,
        passSuccess: 49.3,
        turnoverMargin: 0.35,
        restDays: 8,
        recentForm: 4.9,
        strengthOfSchedule: 1.2,
      },
    },
    context: { homeField: 1, divisional: 0, neutralSite: 0, weatherSeverity: 0.3 },
  },
  {
    id: "kc-cin-2026w01",
    season: 2026,
    week: 1,
    away: {
      code: "CIN",
      name: "Cincinnati",
      qb: "Joe Burrow",
      expectedPoints: 24.8,
      metrics: {
        elo: 1609,
        qbEpa: 0.21,
        qbRating: 102.6,
        offenseEpa: 0.12,
        defenseEpaAllowed: 0.01,
        yardsPerPlay: 5.7,
        rushSuccess: 39.2,
        passSuccess: 48.4,
        turnoverMargin: 0.12,
        restDays: 7,
        recentForm: 2.8,
        strengthOfSchedule: 0.4,
      },
    },
    home: {
      code: "KC",
      name: "Kansas City",
      qb: "Patrick Mahomes",
      expectedPoints: 27.1,
      metrics: {
        elo: 1682,
        qbEpa: 0.25,
        qbRating: 105.1,
        offenseEpa: 0.15,
        defenseEpaAllowed: -0.03,
        yardsPerPlay: 5.9,
        rushSuccess: 41.7,
        passSuccess: 50.1,
        turnoverMargin: 0.26,
        restDays: 7,
        recentForm: 4.6,
        strengthOfSchedule: 1.1,
      },
    },
    context: { homeField: 1, divisional: 0, neutralSite: 0, weatherSeverity: 0.1 },
  },
  {
    id: "phi-dal-2026w01",
    season: 2026,
    week: 1,
    away: {
      code: "DAL",
      name: "Dallas",
      qb: "Dak Prescott",
      expectedPoints: 22.1,
      metrics: {
        elo: 1588,
        qbEpa: 0.14,
        qbRating: 97.8,
        offenseEpa: 0.08,
        defenseEpaAllowed: -0.02,
        yardsPerPlay: 5.4,
        rushSuccess: 40.3,
        passSuccess: 45.8,
        turnoverMargin: -0.04,
        restDays: 6,
        recentForm: 0.8,
        strengthOfSchedule: 0.7,
      },
    },
    home: {
      code: "PHI",
      name: "Philadelphia",
      qb: "Jalen Hurts",
      expectedPoints: 25.4,
      metrics: {
        elo: 1627,
        qbEpa: 0.17,
        qbRating: 99.5,
        offenseEpa: 0.1,
        defenseEpaAllowed: -0.05,
        yardsPerPlay: 5.6,
        rushSuccess: 47.2,
        passSuccess: 46.5,
        turnoverMargin: 0.18,
        restDays: 7,
        recentForm: 2.9,
        strengthOfSchedule: 0.8,
      },
    },
    context: { homeField: 1, divisional: 1, neutralSite: 0, weatherSeverity: 0.4 },
  },
];

const modelProfiles = {
  logistic: {
    intercept: 0.08,
    scale: 0.22,
    marginScale: 7,
    history: { accuracy: 0.641, brier: 0.214, logLoss: 0.628, auc: 0.692 },
    calibration: [
      { bucket: "50-55", predicted: 0.53, actual: 0.51 },
      { bucket: "55-60", predicted: 0.58, actual: 0.56 },
      { bucket: "60-65", predicted: 0.63, actual: 0.61 },
      { bucket: "65-70", predicted: 0.68, actual: 0.66 },
      { bucket: "70-80", predicted: 0.74, actual: 0.71 },
      { bucket: "80+", predicted: 0.83, actual: 0.77 },
    ],
  },
  elo: {
    intercept: 0.04,
    scale: 0.18,
    marginScale: 6.4,
    history: { accuracy: 0.612, brier: 0.225, logLoss: 0.651, auc: 0.661 },
    calibration: [
      { bucket: "50-55", predicted: 0.53, actual: 0.52 },
      { bucket: "55-60", predicted: 0.58, actual: 0.55 },
      { bucket: "60-65", predicted: 0.63, actual: 0.6 },
      { bucket: "65-70", predicted: 0.68, actual: 0.64 },
      { bucket: "70-80", predicted: 0.74, actual: 0.68 },
      { bucket: "80+", predicted: 0.82, actual: 0.73 },
    ],
  },
  gbt: {
    intercept: 0.1,
    scale: 0.25,
    marginScale: 7.4,
    history: { accuracy: 0.653, brier: 0.209, logLoss: 0.615, auc: 0.706 },
    calibration: [
      { bucket: "50-55", predicted: 0.53, actual: 0.52 },
      { bucket: "55-60", predicted: 0.58, actual: 0.57 },
      { bucket: "60-65", predicted: 0.63, actual: 0.62 },
      { bucket: "65-70", predicted: 0.68, actual: 0.65 },
      { bucket: "70-80", predicted: 0.74, actual: 0.72 },
      { bucket: "80+", predicted: 0.84, actual: 0.76 },
    ],
  },
};

const featureSpecs = [
  {
    label: "Elo rating",
    weight: 0.9,
    unit: "pts",
    value: (game) => (game.home.metrics.elo - game.away.metrics.elo) / 25,
    explain: "Team strength proxy based only on games completed before kickoff.",
  },
  {
    label: "QB EPA/play",
    weight: 1.15,
    unit: "EPA",
    value: (game) => (game.home.metrics.qbEpa - game.away.metrics.qbEpa) * 10,
    explain: "Starting quarterback efficiency from pre-game rolling and career form.",
  },
  {
    label: "Offense vs defense",
    weight: 0.95,
    unit: "EPA",
    value: (game) =>
      (game.home.metrics.offenseEpa - game.away.metrics.defenseEpaAllowed -
        (game.away.metrics.offenseEpa - game.home.metrics.defenseEpaAllowed)) *
      8,
    explain: "Matchup edge between each offense and the opposing defensive efficiency.",
  },
  {
    label: "Yards/play",
    weight: 0.42,
    unit: "yp",
    value: (game) => game.home.metrics.yardsPerPlay - game.away.metrics.yardsPerPlay,
    explain: "Explosive-play proxy that helps separate efficient drives from empty yardage.",
  },
  {
    label: "Turnover margin",
    weight: 0.72,
    unit: "diff",
    value: (game) => game.home.metrics.turnoverMargin - game.away.metrics.turnoverMargin,
    explain: "Pre-game turnover differential stabilized through rolling historical windows.",
  },
  {
    label: "Recent form",
    weight: 0.38,
    unit: "pts",
    value: (game) => game.home.metrics.recentForm - game.away.metrics.recentForm,
    explain: "Last-five performance difference using only previous games.",
  },
  {
    label: "Rest advantage",
    weight: 0.22,
    unit: "days",
    value: (game) => game.home.metrics.restDays - game.away.metrics.restDays,
    explain: "Schedule edge from days of rest known before the game.",
  },
  {
    label: "Home field",
    weight: 0.62,
    unit: "flag",
    value: (game) => (game.context.neutralSite ? 0 : game.context.homeField),
    explain: "Home-field indicator, disabled for neutral-site games.",
  },
  {
    label: "Weather drag",
    weight: -0.18,
    unit: "sev",
    value: (game) => game.context.weatherSeverity,
    explain: "Weather severity can suppress offensive edges and raise uncertainty.",
  },
];

const metricRows = [
  ["QB rating", "qbRating", "", 1],
  ["QB EPA/play", "qbEpa", "", 2],
  ["Off EPA", "offenseEpa", "", 2],
  ["Def EPA allowed", "defenseEpaAllowed", "", 2, true],
  ["Yards/play", "yardsPerPlay", "", 1],
  ["Rush success", "rushSuccess", "%", 1],
  ["Pass success", "passSuccess", "%", 1],
  ["Turnover margin", "turnoverMargin", "", 2],
  ["Rest", "restDays", "days", 0],
  ["Recent form", "recentForm", "pts", 1],
];

const state = {
  gameId: games[0].id,
  modelId: "logistic",
};

const $ = (selector) => document.querySelector(selector);

function init() {
  $("#gameSelect").innerHTML = games
    .map((game) => `<option value="${game.id}">${game.away.code} at ${game.home.code} - Week ${game.week}</option>`)
    .join("");

  $("#gameSelect").addEventListener("change", (event) => {
    state.gameId = event.target.value;
    render();
  });

  $("#modelSelect").addEventListener("change", (event) => {
    state.modelId = event.target.value;
    render();
  });

  render();
}

function getGame() {
  return games.find((game) => game.id === state.gameId);
}

function getModel() {
  return modelProfiles[state.modelId];
}

function render() {
  const game = getGame();
  const model = getModel();
  const prediction = predict(game, model);

  renderPrediction(game, prediction);
  renderFeatureChart(prediction.contributions);
  renderFactors(game, prediction.contributions);
  renderComparisonTable(game);
  renderHistory(model);
  renderCalibration(model.calibration);
}

function predict(game, model) {
  const contributions = featureSpecs.map((feature) => {
    const rawValue = feature.value(game);
    return {
      ...feature,
      rawValue,
      contribution: rawValue * feature.weight * model.scale,
    };
  });
  const modelScore =
    model.intercept + contributions.reduce((sum, feature) => sum + feature.contribution, 0);
  const homeWinProbability = sigmoid(modelScore);
  const awayWinProbability = 1 - homeWinProbability;
  const predictedMargin = modelScore * model.marginScale;
  const totalPoints = game.home.expectedPoints + game.away.expectedPoints;
  const homeScore = Math.round((totalPoints + predictedMargin) / 2);
  const awayScore = Math.round(totalPoints - homeScore);
  const homeFavored = homeWinProbability >= awayWinProbability;
  const confidence = confidenceTier(Math.max(homeWinProbability, awayWinProbability));

  return {
    homeWinProbability,
    awayWinProbability,
    predictedMargin,
    homeScore,
    awayScore,
    predictedWinner: homeFavored ? game.home.name : game.away.name,
    winnerCode: homeFavored ? game.home.code : game.away.code,
    confidence,
    contributions,
  };
}

function renderPrediction(game, prediction) {
  $("#awayLabel").textContent = `${game.away.code} away`;
  $("#homeLabel").textContent = `${game.home.code} home`;
  $("#awayTeam").textContent = game.away.name;
  $("#homeTeam").textContent = game.home.name;
  $("#awayProbability").textContent = percent(prediction.awayWinProbability);
  $("#homeProbability").textContent = percent(prediction.homeWinProbability);
  $("#homeProbabilityFill").style.width = percent(prediction.homeWinProbability);
  $("#predictedWinner").textContent = prediction.winnerCode;
  $("#winnerContext").textContent = prediction.predictedWinner;
  $("#confidenceTier").textContent = prediction.confidence.label;
  $("#confidenceContext").textContent = `${percent(prediction.confidence.probability)} model probability`;
  $("#predictedMargin").textContent = `${game.home.code} ${signed(prediction.predictedMargin)}`;
  $("#projectedScore").textContent = `${game.away.code} ${prediction.awayScore} - ${game.home.code} ${prediction.homeScore}`;
}

function renderFeatureChart(contributions) {
  const max = Math.max(...contributions.map((feature) => Math.abs(feature.contribution)), 0.1);
  $("#featureChart").innerHTML = [...contributions]
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 7)
    .map((feature) => {
      const positive = feature.contribution >= 0;
      return `
        <div class="feature-row">
          <span>${feature.label}</span>
          <div class="bar-track ${positive ? "positive" : "negative"}" aria-label="${feature.label} ${signed(feature.contribution)}">
            <i style="width:${(Math.abs(feature.contribution) / max) * 100}%"></i>
          </div>
          <span class="numeric">${signed(feature.contribution)}</span>
        </div>
      `;
    })
    .join("");
}

function renderFactors(game, contributions) {
  const sorted = [...contributions].sort(
    (a, b) => Math.abs(b.contribution) - Math.abs(a.contribution),
  );
  const positives = sorted.filter((feature) => feature.contribution > 0).slice(0, 4);
  const negatives = sorted.filter((feature) => feature.contribution < 0).slice(0, 4);

  $("#positiveFactors").innerHTML = positives
    .map((feature) => {
      return `<li><strong>${game.home.code}</strong>: ${feature.label} ${signed(feature.rawValue)} ${feature.unit}. ${feature.explain}</li>`;
    })
    .join("");
  $("#negativeFactors").innerHTML = negatives
    .map((feature) => {
      return `<li><strong>${game.away.code}</strong>: ${feature.label} ${signed(Math.abs(feature.rawValue))} ${feature.unit}. ${feature.explain}</li>`;
    })
    .join("");
}

function renderComparisonTable(game) {
  $("#awayMetricHeader").textContent = game.away.code;
  $("#homeMetricHeader").textContent = game.home.code;
  $("#comparisonTable").innerHTML = metricRows
    .map(([label, key, unit, digits, lowerIsBetter]) => {
      const away = game.away.metrics[key];
      const home = game.home.metrics[key];
      const edge = lowerIsBetter ? away - home : home - away;
      return `
        <tr>
          <td>${label}</td>
          <td class="numeric">${formatMetric(away, digits)} ${unit}</td>
          <td class="numeric">${formatMetric(home, digits)} ${unit}</td>
          <td class="numeric">${signed(edge)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderHistory(model) {
  $("#historyAccuracy").textContent = percent(model.history.accuracy);
  $("#historyBrier").textContent = model.history.brier.toFixed(3);
  $("#historyLogLoss").textContent = model.history.logLoss.toFixed(3);
  $("#historyAuc").textContent = model.history.auc.toFixed(3);
}

function renderCalibration(calibration) {
  $("#calibrationChart").innerHTML = calibration
    .map((bucket) => {
      return `
        <div class="calibration-row">
          <span>${bucket.bucket}</span>
          <div class="calibration-bars">
            <div class="bar-track predicted" aria-label="${bucket.bucket} predicted ${percent(bucket.predicted)}">
              <i style="width:${bucket.predicted * 100}%"></i>
            </div>
            <div class="bar-track actual" aria-label="${bucket.bucket} actual ${percent(bucket.actual)}">
              <i style="width:${bucket.actual * 100}%"></i>
            </div>
          </div>
          <span class="calibration-value">${percent(bucket.predicted)} / ${percent(bucket.actual)}</span>
        </div>
      `;
    })
    .join("");
}

function confidenceTier(probability) {
  if (probability < 0.55) return { label: "Toss-up", probability };
  if (probability < 0.62) return { label: "Slight edge", probability };
  if (probability < 0.7) return { label: "Moderate", probability };
  return { label: "Strong signal", probability };
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function percent(value) {
  return `${Math.round(value * 100)}%`;
}

function signed(value) {
  const rounded = Number(value).toFixed(Math.abs(value) < 10 ? 1 : 0);
  return Number(value) > 0 ? `+${rounded}` : rounded;
}

function formatMetric(value, digits) {
  return Number(value).toFixed(digits);
}

init();
