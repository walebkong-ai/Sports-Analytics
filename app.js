const teams = [
  {
    id: "harbor",
    name: "Harbor City",
    pace: 99.4,
    offense: 118.6,
    defense: 110.2,
    net: 8.4,
    rank: 2,
    rotation: 84,
    factors: { shooting: 57, turnovers: 13, rebounding: 28, freeThrows: 21 },
    trend: {
      net: [5, 6, 4, 7, 8, 6, 9, 11, 8, 10, 12, 9],
      offense: [114, 116, 112, 119, 121, 117, 122, 124, 119, 125, 126, 123],
      defense: [109, 110, 108, 112, 113, 111, 110, 109, 111, 110, 108, 109],
    },
    shots: [
      { zone: "Rim", share: 34, epp: 1.32 },
      { zone: "Corner 3", share: 18, epp: 1.18 },
      { zone: "Arc 3", share: 24, epp: 1.07 },
      { zone: "Mid", share: 14, epp: 0.89 },
      { zone: "FT", share: 10, epp: 1.48 },
    ],
    players: [
      { name: "D. Vale", role: "Primary creator", usage: 31.4, ts: 61.2, onOff: 8.7 },
      { name: "M. Stone", role: "Wing scorer", usage: 24.6, ts: 58.9, onOff: 4.9 },
      { name: "T. Knox", role: "Point defender", usage: 16.8, ts: 55.1, onOff: 6.4 },
      { name: "I. Chen", role: "Stretch big", usage: 19.5, ts: 63.4, onOff: 7.2 },
      { name: "J. Reed", role: "Second unit", usage: 22.1, ts: 56.6, onOff: 1.8 },
    ],
  },
  {
    id: "metro",
    name: "Metro North",
    pace: 96.8,
    offense: 115.1,
    defense: 111.5,
    net: 3.6,
    rank: 7,
    rotation: 78,
    factors: { shooting: 54, turnovers: 12, rebounding: 31, freeThrows: 18 },
    trend: {
      net: [3, 1, 2, 5, 4, 6, 3, 4, 7, 5, 4, 6],
      offense: [111, 110, 113, 116, 115, 118, 114, 116, 119, 116, 115, 118],
      defense: [108, 109, 111, 111, 111, 112, 111, 112, 112, 111, 111, 112],
    },
    shots: [
      { zone: "Rim", share: 30, epp: 1.25 },
      { zone: "Corner 3", share: 14, epp: 1.11 },
      { zone: "Arc 3", share: 28, epp: 1.08 },
      { zone: "Mid", share: 18, epp: 0.93 },
      { zone: "FT", share: 10, epp: 1.42 },
    ],
    players: [
      { name: "A. Mercer", role: "Lead guard", usage: 29.2, ts: 59.4, onOff: 5.8 },
      { name: "B. Lyons", role: "Roll big", usage: 18.7, ts: 65.1, onOff: 3.1 },
      { name: "S. Vega", role: "Movement wing", usage: 21.8, ts: 57.8, onOff: 2.4 },
      { name: "K. Price", role: "Bench creator", usage: 25.6, ts: 54.9, onOff: -1.2 },
      { name: "N. Ellis", role: "Glue forward", usage: 13.2, ts: 60.5, onOff: 4.2 },
    ],
  },
  {
    id: "summit",
    name: "Summit Valley",
    pace: 101.1,
    offense: 113.7,
    defense: 113.9,
    net: -0.2,
    rank: 13,
    rotation: 69,
    factors: { shooting: 52, turnovers: 15, rebounding: 33, freeThrows: 24 },
    trend: {
      net: [-4, -2, 1, -1, 3, 2, -3, 0, 1, -2, 2, 0],
      offense: [109, 112, 114, 111, 116, 115, 110, 113, 114, 111, 116, 114],
      defense: [113, 114, 113, 112, 113, 113, 113, 113, 113, 113, 114, 114],
    },
    shots: [
      { zone: "Rim", share: 36, epp: 1.22 },
      { zone: "Corner 3", share: 12, epp: 1.04 },
      { zone: "Arc 3", share: 22, epp: 1.01 },
      { zone: "Mid", share: 16, epp: 0.88 },
      { zone: "FT", share: 14, epp: 1.51 },
    ],
    players: [
      { name: "R. Cole", role: "Slasher", usage: 27.5, ts: 56.4, onOff: 1.7 },
      { name: "P. Sato", role: "Pick-pop big", usage: 20.9, ts: 58.7, onOff: 2.1 },
      { name: "L. Brooks", role: "Connector", usage: 14.1, ts: 61.3, onOff: 3.6 },
      { name: "C. Young", role: "Guard stopper", usage: 12.9, ts: 52.8, onOff: 2.9 },
      { name: "E. Marin", role: "Sixth player", usage: 24.2, ts: 55.6, onOff: -0.4 },
    ],
  },
  {
    id: "river",
    name: "Rivergate",
    pace: 94.7,
    offense: 111.4,
    defense: 107.6,
    net: 3.8,
    rank: 6,
    rotation: 81,
    factors: { shooting: 51, turnovers: 11, rebounding: 35, freeThrows: 16 },
    trend: {
      net: [1, 4, 5, 3, 6, 7, 4, 5, 3, 2, 6, 8],
      offense: [108, 112, 113, 111, 114, 115, 112, 113, 110, 109, 115, 116],
      defense: [107, 108, 108, 108, 108, 108, 108, 108, 107, 107, 109, 108],
    },
    shots: [
      { zone: "Rim", share: 28, epp: 1.2 },
      { zone: "Corner 3", share: 16, epp: 1.16 },
      { zone: "Arc 3", share: 20, epp: 1.02 },
      { zone: "Mid", share: 24, epp: 0.96 },
      { zone: "FT", share: 12, epp: 1.39 },
    ],
    players: [
      { name: "H. Novak", role: "Two-way guard", usage: 25.1, ts: 58.2, onOff: 5.2 },
      { name: "G. Malik", role: "Interior anchor", usage: 17.6, ts: 62.9, onOff: 7.1 },
      { name: "O. Finch", role: "Shooter", usage: 18.4, ts: 60.8, onOff: 3.7 },
      { name: "V. Ross", role: "Wing defender", usage: 13.7, ts: 54.2, onOff: 1.9 },
      { name: "Q. Hart", role: "Reserve guard", usage: 22.8, ts: 53.7, onOff: -2.1 },
    ],
  },
];

const state = {
  teamId: teams[0].id,
  opponentId: teams[1].id,
  trend: "net",
  sortDescending: true,
  sliders: {
    pace: 0,
    turnover: 0,
    home: 0,
  },
};

const colors = {
  text: "#15202b",
  muted: "#667085",
  line: "#d7dee8",
  primary: "#155e75",
  orange: "#c45a16",
  green: "#14845e",
  red: "#b42318",
  blue: "#2563eb",
  violet: "#7c3aed",
  yellow: "#c69026",
};

const $ = (selector) => document.querySelector(selector);

function init() {
  populateSelects();
  bindEvents();
  render();
}

function populateSelects() {
  const options = teams
    .map((team) => `<option value="${team.id}">${team.name}</option>`)
    .join("");
  $("#teamSelect").innerHTML = options;
  $("#opponentSelect").innerHTML = options;
  $("#teamSelect").value = state.teamId;
  $("#opponentSelect").value = state.opponentId;
}

function bindEvents() {
  $("#teamSelect").addEventListener("change", (event) => {
    state.teamId = event.target.value;
    if (state.teamId === state.opponentId) {
      state.opponentId = teams.find((team) => team.id !== state.teamId).id;
      $("#opponentSelect").value = state.opponentId;
    }
    render();
  });

  $("#opponentSelect").addEventListener("change", (event) => {
    state.opponentId = event.target.value;
    if (state.teamId === state.opponentId) {
      state.teamId = teams.find((team) => team.id !== state.opponentId).id;
      $("#teamSelect").value = state.teamId;
    }
    render();
  });

  document.querySelectorAll("[data-trend]").forEach((button) => {
    button.addEventListener("click", () => {
      state.trend = button.dataset.trend;
      document.querySelectorAll("[data-trend]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      renderTrendChart(getTeam(), getOpponent());
    });
  });

  $("#sortPlayers").addEventListener("click", () => {
    state.sortDescending = !state.sortDescending;
    renderPlayerTable(getTeam());
  });

  [
    ["paceSlider", "pace"],
    ["turnoverSlider", "turnover"],
    ["homeSlider", "home"],
  ].forEach(([id, key]) => {
    $(`#${id}`).addEventListener("input", (event) => {
      state.sliders[key] = Number(event.target.value);
      renderScenario(getTeam(), getOpponent());
    });
  });

  window.addEventListener("resize", () => {
    renderTrendChart(getTeam(), getOpponent());
    renderShotChart(getTeam());
  });
}

function getTeam() {
  return teams.find((team) => team.id === state.teamId);
}

function getOpponent() {
  return teams.find((team) => team.id === state.opponentId);
}

function render() {
  const team = getTeam();
  const opponent = getOpponent();
  renderMetrics(team, opponent);
  renderTrendChart(team, opponent);
  renderFactorChart(team, opponent);
  renderShotChart(team);
  renderScenario(team, opponent);
  renderPlayerTable(team);
  renderInsights(team, opponent);
}

function renderMetrics(team, opponent) {
  const edge = getFactorEdge(team, opponent);
  const win = getWinChance(team, opponent);

  $("#netRating").textContent = signed(team.net);
  $("#netContext").textContent = `League rank ${team.rank}`;
  $("#winChance").textContent = `${Math.round(win)}%`;
  $("#winContext").textContent = `${team.name} vs ${opponent.name}`;
  $("#factorEdge").textContent = signed(edge);
  $("#factorContext").textContent = edge >= 0 ? "Profile advantage" : "Profile deficit";
  $("#rotationTrust").textContent = team.rotation;
  $("#rotationContext").textContent = team.rotation >= opponent.rotation ? "Deeper rotation" : "Depth risk";
}

function getFactorEdge(team, opponent) {
  return Number(
    (
      (team.factors.shooting - opponent.factors.shooting) * 0.42 -
      (team.factors.turnovers - opponent.factors.turnovers) * 0.22 +
      (team.factors.rebounding - opponent.factors.rebounding) * 0.23 +
      (team.factors.freeThrows - opponent.factors.freeThrows) * 0.13
    ).toFixed(1),
  );
}

function getWinChance(team, opponent) {
  const base = 50 + (team.net - opponent.net) * 2.7 + getFactorEdge(team, opponent) * 1.3;
  return clamp(base, 8, 92);
}

function renderTrendChart(team, opponent) {
  const container = $("#trendChart");
  const width = Math.max(container.clientWidth, 320);
  const height = width < 520 ? 280 : 330;
  const margin = {
    top: 22,
    right: 20,
    bottom: 42,
    left: 46,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const metric = state.trend;
  const teamValues = team.trend[metric];
  const opponentValues = opponent.trend[metric];
  const values = [...teamValues, ...opponentValues];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.max(2, (max - min) * 0.15);
  const yMin = metric === "defense" ? Math.max(95, min - pad) : min - pad;
  const yMax = max + pad;
  const x = (index) => margin.left + (index / (teamValues.length - 1)) * innerWidth;
  const y = (value) => margin.top + ((yMax - value) / (yMax - yMin)) * innerHeight;

  const teamPath = linePath(teamValues, x, y);
  const opponentPath = linePath(opponentValues, x, y);
  const ticks = getTicks(yMin, yMax, 4);
  const xTicks = width < 520 ? [0, 3, 7, 11] : [0, 2, 4, 6, 8, 10, 11];

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <rect x="${margin.left}" y="${margin.top}" width="${innerWidth}" height="${innerHeight}" fill="transparent" stroke="${colors.line}" />
      ${ticks
        .map(
          (tick) => `
            <line class="grid-line" x1="${margin.left}" x2="${width - margin.right}" y1="${y(tick)}" y2="${y(tick)}" />
            <text class="axis-label" x="${margin.left - 9}" y="${y(tick) + 4}" text-anchor="end">${formatTick(tick, metric)}</text>
          `,
        )
        .join("")}
      ${xTicks
        .map(
          (tick) => `
            <text class="axis-label" x="${x(tick)}" y="${height - 16}" text-anchor="middle">G${tick + 1}</text>
          `,
        )
        .join("")}
      <path class="team-line" d="${teamPath}" />
      <path class="opponent-line" d="${opponentPath}" />
      ${teamValues
        .map((value, index) => `<circle class="team-dot" cx="${x(index)}" cy="${y(value)}" r="4" />`)
        .join("")}
      ${opponentValues
        .map((value, index) => `<circle class="opponent-dot" cx="${x(index)}" cy="${y(value)}" r="4" />`)
        .join("")}
      <text class="chart-label" x="${margin.left}" y="14">${team.name}</text>
      <circle class="team-dot" cx="${margin.left + 92}" cy="10" r="4" />
      <text class="chart-label" x="${margin.left + 112}" y="14">${opponent.name}</text>
      <circle class="opponent-dot" cx="${margin.left + 210}" cy="10" r="4" />
    </svg>
  `;
}

function linePath(values, x, y) {
  return values
    .map((value, index) => `${index === 0 ? "M" : "L"} ${x(index).toFixed(2)} ${y(value).toFixed(2)}`)
    .join(" ");
}

function getTicks(min, max, count) {
  const step = (max - min) / Math.max(count - 1, 1);
  return Array.from({ length: count }, (_, index) => min + step * index);
}

function formatTick(value, metric) {
  if (metric === "net") return signed(value);
  return value.toFixed(0);
}

function renderFactorChart(team, opponent) {
  const factors = [
    ["shooting", "eFG"],
    ["turnovers", "TOV"],
    ["rebounding", "REB"],
    ["freeThrows", "FT rate"],
  ];

  $("#factorChart").innerHTML = factors
    .map(([key, label]) => {
      const teamValue = team.factors[key];
      const opponentValue = opponent.factors[key];
      const max = Math.max(teamValue, opponentValue, 1);
      return `
        <div class="factor-row">
          <span>${label}</span>
          <div class="bar-track">
            <div class="bar team" aria-label="${team.name} ${label} ${teamValue}">
              <i style="width:${(teamValue / max) * 100}%"></i>
            </div>
            <div class="bar opponent" aria-label="${opponent.name} ${label} ${opponentValue}">
              <i style="width:${(opponentValue / max) * 100}%"></i>
            </div>
          </div>
          <span class="numeric">${signed(teamValue - opponentValue)}</span>
        </div>
      `;
    })
    .join("");
}

function renderShotChart(team) {
  const container = $("#shotChart");
  const width = Math.max(container.clientWidth, 300);
  const height = width < 520 ? 280 : 320;
  const courtWidth = width - 24;
  const courtHeight = height - 30;
  const left = 12;
  const top = 12;
  const zones = team.shots;
  const colorFor = (epp) => {
    if (epp >= 1.35) return colors.green;
    if (epp >= 1.13) return colors.blue;
    if (epp >= 1) return colors.violet;
    return colors.yellow;
  };

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <rect class="court-floor" x="${left}" y="${top}" width="${courtWidth}" height="${courtHeight}" rx="8" />
      <path class="court-line" d="M ${left + courtWidth / 2} ${top + courtHeight} L ${left + courtWidth / 2} ${top + courtHeight - 42}" />
      <rect class="court-line" x="${left + courtWidth / 2 - 48}" y="${top + courtHeight - 92}" width="96" height="92" />
      <circle class="court-line" cx="${left + courtWidth / 2}" cy="${top + courtHeight - 92}" r="48" />
      <path class="court-line" d="M ${left + 52} ${top + courtHeight} L ${left + 52} ${top + courtHeight - 164}" />
      <path class="court-line" d="M ${left + courtWidth - 52} ${top + courtHeight} L ${left + courtWidth - 52} ${top + courtHeight - 164}" />
      <path class="court-line" d="M ${left + 52} ${top + courtHeight - 164} Q ${left + courtWidth / 2} ${top + 8} ${left + courtWidth - 52} ${top + courtHeight - 164}" />
      ${zones
        .map((zone, index) => {
          const radius = 16 + zone.share * 0.5;
          const positions = [
            [0.5, 0.8],
            [0.24, 0.58],
            [0.76, 0.48],
            [0.5, 0.5],
            [0.5, 0.22],
          ];
          const [px, py] = positions[index];
          return `
            <circle class="shot-zone" cx="${left + courtWidth * px}" cy="${top + courtHeight * py}" r="${radius}" fill="${colorFor(zone.epp)}" opacity="0.82" />
            <text class="court-label" x="${left + courtWidth * px}" y="${top + courtHeight * py - 3}" text-anchor="middle">${zone.zone}</text>
            <text class="court-label" x="${left + courtWidth * px}" y="${top + courtHeight * py + 14}" text-anchor="middle">${zone.epp.toFixed(2)} epp</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function renderScenario(team, opponent) {
  const pace = state.sliders.pace;
  const turnover = state.sliders.turnover;
  const home = state.sliders.home;
  const baseMargin = team.net - opponent.net + getFactorEdge(team, opponent) * 0.35;
  const margin = baseMargin + pace * 0.28 + turnover * 0.62 + home;
  const total =
    ((team.offense + opponent.offense + (120 - team.defense) + (120 - opponent.defense)) / 2) *
      ((team.pace + opponent.pace + pace) / 100) +
    Math.abs(turnover) * 0.8;

  $("#paceValue").textContent = signed(pace);
  $("#turnoverValue").textContent = signed(turnover);
  $("#homeValue").textContent = signed(home);
  $("#projectedMargin").textContent = signed(margin);
  $("#expectedTotal").textContent = total.toFixed(1);
}

function renderPlayerTable(team) {
  const players = [...team.players].sort((a, b) =>
    state.sortDescending ? b.onOff - a.onOff : a.onOff - b.onOff,
  );
  $("#playerTable").innerHTML = players
    .map(
      (player) => `
        <tr>
          <td>${player.name}</td>
          <td class="role">${player.role}</td>
          <td class="numeric">${player.usage.toFixed(1)}%</td>
          <td class="numeric">${player.ts.toFixed(1)}</td>
          <td class="numeric">${signed(player.onOff)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderInsights(team, opponent) {
  const edge = getFactorEdge(team, opponent);
  const shootingGap = team.factors.shooting - opponent.factors.shooting;
  const turnoverGap = opponent.factors.turnovers - team.factors.turnovers;
  const rotationGap = team.rotation - opponent.rotation;
  const paceText =
    team.pace > opponent.pace
      ? `${team.name} can raise tempo by ${Math.abs(team.pace - opponent.pace).toFixed(1)} possessions.`
      : `${opponent.name} is better suited to dictate pace unless ${team.name} wins early offense.`;

  const notes = [
    `${team.name} owns a ${signed(edge)} four factors edge, driven most by ${Math.abs(shootingGap) >= 2 ? "shot quality" : "secondary possessions"}.`,
    `${turnoverGap >= 0 ? team.name : opponent.name} has the ball security advantage by ${Math.abs(turnoverGap).toFixed(1)} points in turnover rate.`,
    `${rotationGap >= 0 ? "Depth is a stabilizer" : "Depth is the main stress point"} for ${team.name}; rotation trust gap is ${signed(rotationGap)}.`,
    paceText,
  ];

  $("#insightList").innerHTML = notes.map((note) => `<li>${note}</li>`).join("");
}

function signed(value) {
  const rounded = Number(value).toFixed(Math.abs(value) < 10 ? 1 : 0);
  return Number(value) > 0 ? `+${rounded}` : rounded;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

init();
