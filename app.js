const STARTING_BUDGET = 20000;
const ROUND_BUDGET = 20000;
const MAX_BUDGET = 40000;

const iconSet = {
  shield: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z\"/></svg>",
  backup: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 12a8 8 0 1 0 3-6\"/><path d=\"M4 4v6h6\"/></svg>",
  malware: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M8 9l8 8M16 9l-8 8\"/><circle cx=\"12\" cy=\"12\" r=\"9\"/></svg>",
  antivirus: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 3v18M5 12h14\"/><circle cx=\"12\" cy=\"12\" r=\"9\"/></svg>",
  lock: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 10V7a4 4 0 1 1 8 0v3\"/></svg>",
  password: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 12h16\"/><path d=\"M8 16v-8\"/><circle cx=\"16\" cy=\"12\" r=\"3\"/></svg>",
  update: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 12a8 8 0 1 0 3-6\"/><path d=\"M4 4v6h6\"/></svg>",
  isp: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M2 12h20\"/><path d=\"M6 8h12\"/><path d=\"M8 16h8\"/></svg>",
  captcha: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M7 9h4M7 13h10\"/></svg>",
  firewall: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 4h16v16H4z\"/><path d=\"M4 10h16M9 4v6M15 10v10\"/></svg>",
  training: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 19h16\"/><path d=\"M6 17v-5l6-3 6 3v5\"/></svg>",
  alert: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 3l9 16H3l9-16z\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/></svg>",
  skull: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M6 13v-2a6 6 0 0 1 12 0v2\"/><path d=\"M8 13v4M16 13v4\"/><path d=\"M9 21h6\"/></svg>",
  signal: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 16h4v4H4z\"/><path d=\"M10 12h4v8h-4z\"/><path d=\"M16 8h4v12h-4z\"/></svg>",
  key: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"7\" cy=\"17\" r=\"3\"/><path d=\"M10 17h11\"/><path d=\"M18 17v-3\"/></svg>",
  bug: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 9h6v8a3 3 0 0 1-6 0V9z\"/><path d=\"M12 5v4\"/><path d=\"M4 13h4M16 13h4\"/></svg>",
  breach: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M6 4h12v8\"/><path d=\"M6 12v8h12\"/><path d=\"M12 12l6-6\"/></svg>",
  spy: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z\"/></svg>",
  ad: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M7 16l3-8 3 8\"/><path d=\"M15 12h2\"/></svg>"
};

const riskThreats = [
  {
    name: "Social engineering",
    recommended: { x: 3, y: 3 },
    explanation: "People are often targeted by tricking them into sharing information, so it can be likely and quite harmful.",
    suggestions: ["Staff training", "Secure password policy"]
  },
  {
    name: "Ransomware",
    recommended: { x: 3, y: 4 },
    explanation: "Ransomware can shut down a business quickly and cause major damage if it spreads.",
    suggestions: ["Regular backups", "Anti-malware"]
  },
  {
    name: "Botnet (vulnerability scanning)",
    recommended: { x: 2, y: 2 },
    explanation: "Automated scanning is common, but the impact depends on what it finds.",
    suggestions: ["Upgrade all software", "Firewall"]
  },
  {
    name: "Brute force",
    recommended: { x: 3, y: 2 },
    explanation: "Password guessing is frequent, but strong login controls reduce the impact.",
    suggestions: ["Two-factor authentication", "Secure password policy"]
  },
  {
    name: "DDoS",
    recommended: { x: 4, y: 3 },
    explanation: "DDoS attacks are very likely on public sites and can seriously disrupt service.",
    suggestions: ["ISP traffic regulation", "CAPTCHA", "Firewall"]
  },
  {
    name: "Virus",
    recommended: { x: 2, y: 2 },
    explanation: "Viruses still happen, but good protection can limit how much damage they cause.",
    suggestions: ["Anti-virus", "Regular backups"]
  },
  {
    name: "Internal threat",
    recommended: { x: 2, y: 3 },
    explanation: "Issues from inside the organisation are less likely but can be quite damaging if they happen.",
    suggestions: ["Staff training", "Secure password policy"]
  }
];

const protections = [
  { name: "Penetration testers", cost: 20000, description: "Ethical hackers who test your defences.", icon: iconSet.shield },
  { name: "Regular backups", cost: 10000, description: "Restores data quickly after attacks.", icon: iconSet.backup },
  { name: "Anti-malware", cost: 10000, description: "Stops malicious software and suspicious files.", icon: iconSet.malware },
  { name: "Anti-virus", cost: 5000, description: "Detects and removes computer viruses.", icon: iconSet.antivirus },
  { name: "Two-factor authentication", cost: 15000, description: "Adds a second check for logins.", icon: iconSet.lock },
  { name: "Secure password policy", cost: 5000, description: "Strong, unique passwords for everyone.", icon: iconSet.password },
  { name: "Upgrade all software", cost: 15000, description: "Closes known security gaps.", icon: iconSet.update },
  { name: "ISP traffic regulation", cost: 10000, description: "Your ISP filters harmful traffic.", icon: iconSet.isp },
  { name: "CAPTCHA", cost: 5000, description: "Blocks automated bot traffic.", icon: iconSet.captcha },
  { name: "Firewall", cost: 20000, description: "Blocks unwanted network access.", icon: iconSet.firewall },
  { name: "Staff training", cost: 20000, description: "Staff spot scams and report issues quickly.", icon: iconSet.training }
];

const attackTypes = [
  "Blagging",
  "Ransomware",
  "DDoS",
  "Brute force",
  "Virus",
  "Hacking",
  "Adware",
  "Spyware"
];

const incidents = [
  {
    title: "Suspicious Phone Call",
    description: "A caller claims to be from the IT helpdesk and asks for a staff member's login details so they can 'fix an urgent issue'.",
    attackType: "Blagging",
    counters: ["Staff training", "Secure password policy"],
    explanation: "Blagging is social engineering. Trained staff and strict password rules prevent staff from sharing credentials.",
    icon: iconSet.alert
  },
  {
    title: "Locked Files Everywhere",
    description: "Employees find their files encrypted with a message demanding payment to unlock them.",
    attackType: "Ransomware",
    counters: ["Regular backups", "Anti-malware"],
    explanation: "Backups restore data and anti-malware blocks the ransomware before it spreads.",
    icon: iconSet.skull
  },
  {
    title: "Website Flooded",
    description: "The retailer's website slows down as massive amounts of traffic arrive from unknown sources.",
    attackType: "DDoS",
    counters: ["ISP traffic regulation", "CAPTCHA", "Firewall"],
    explanation: "DDoS attacks are blocked by filtering traffic, CAPTCHAs, and strong firewall rules.",
    icon: iconSet.signal
  },
  {
    title: "Password Guessing",
    description: "Your system logs show thousands of rapid login attempts on staff accounts.",
    attackType: "Brute force",
    counters: ["Secure password policy", "Two-factor authentication"],
    explanation: "Strong passwords and two-factor authentication stop automated guessing.",
    icon: iconSet.key
  },
  {
    title: "Unexpected Pop-ups",
    description: "Staff computers display unwanted pop-up adverts and performance is slowing.",
    attackType: "Adware",
    counters: ["Anti-malware", "Staff training"],
    explanation: "Anti-malware removes adware, and trained staff avoid suspicious downloads.",
    icon: iconSet.ad
  },
  {
    title: "Mysterious Files",
    description: "An unknown program has been installed and is copying files without permission.",
    attackType: "Spyware",
    counters: ["Anti-malware", "Staff training"],
    explanation: "Anti-malware detects spyware and staff training reduces risky installs.",
    icon: iconSet.spy
  },
  {
    title: "Strange Emails",
    description: "An attachment opens and suddenly computers start behaving erratically.",
    attackType: "Virus",
    counters: ["Anti-virus", "Regular backups"],
    explanation: "Anti-virus blocks infections and backups help recover damaged data.",
    icon: iconSet.bug
  },
  {
    title: "System Breach",
    description: "Attackers exploit old software to gain access to the network.",
    attackType: "Hacking",
    counters: ["Upgrade all software", "Firewall", "Penetration testers"],
    explanation: "Up-to-date software, firewalls, and penetration testing reduce hacking risk.",
    icon: iconSet.breach
  }
];

const TOTAL_ROUNDS = incidents.length;

const state = {
  round: 1,
  score: 0,
  budget: STARTING_BUDGET,
  selectedProtections: new Set(),
  incidentsRemaining: [],
  currentIncident: null,
  attackChoice: null,
  protectionChoice: null,
  incidentHistory: [],
  effectiveProtections: new Map(),
  risk: {
    placements: new Map(),
    scores: new Map(),
    selectedThreatId: null,
    bonusAwarded: false,
    recommendedProtections: []
  }
};

const screens = {
  intro: document.getElementById("screen-intro"),
  risk: document.getElementById("screen-risk"),
  shop: document.getElementById("screen-shop"),
  incident: document.getElementById("screen-incident"),
  investigation: document.getElementById("screen-investigation"),
  feedback: document.getElementById("screen-feedback"),
  end: document.getElementById("screen-end")
};

const roundCounter = document.getElementById("roundCounter");
const scoreCounter = document.getElementById("scoreCounter");
const budgetCounter = document.getElementById("budgetCounter");
const shopGrid = document.getElementById("shopGrid");
const selectedList = document.getElementById("selectedList");
const shopMessage = document.getElementById("shopMessage");
const continueToIncidentBtn = document.getElementById("continueToIncidentBtn");
const incidentCard = document.getElementById("incidentCard");
const incidentPrompt = document.getElementById("incidentPrompt");
const attackOptions = document.getElementById("attackOptions");
const protectionOptions = document.getElementById("protectionOptions");
const submitInvestigationBtn = document.getElementById("submitInvestigationBtn");
const feedbackContent = document.getElementById("feedbackContent");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const finalScore = document.getElementById("finalScore");
const summaryContent = document.getElementById("summaryContent");
const investigationProtections = document.getElementById("investigationProtections");
const soundToggleBtn = document.getElementById("soundToggleBtn");
const riskGrid = document.getElementById("riskGrid");
const riskTray = document.getElementById("riskTray");
const riskScoreValue = document.getElementById("riskScoreValue");
const riskFeedback = document.getElementById("riskFeedback");
const riskBonusMessage = document.getElementById("riskBonusMessage");
const riskContinueBtn = document.getElementById("riskContinueBtn");
const riskResetBtn = document.getElementById("riskResetBtn");
const riskHintBtn = document.getElementById("riskHintBtn");
const recommendedPanel = document.getElementById("recommendedPanel");
const recommendedList = document.getElementById("recommendedList");

const startGameBtn = document.getElementById("startGameBtn");
const investigateBtn = document.getElementById("investigateBtn");
const restartBtn = document.getElementById("restartBtn");

const formatMoney = (value) => `£${value.toLocaleString("en-GB")}`;

const audioState = {
  enabled: true,
  context: null
};

const ensureAudioContext = () => {
  if (!audioState.context) {
    audioState.context = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioState.context.state === "suspended") {
    audioState.context.resume();
  }
};

const playTone = (frequency, duration = 0.16, type = "sine") => {
  if (!audioState.enabled) return;
  ensureAudioContext();
  const context = audioState.context;
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.08;
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
};

const playSound = (variant) => {
  if (!audioState.enabled) return;
  const tones = {
    click: [540],
    select: [620, 780],
    warning: [280, 220],
    success: [660, 880, 990],
    fail: [240, 190]
  };
  const selected = tones[variant] || tones.click;
  selected.forEach((freq, index) => {
    setTimeout(() => playTone(freq, 0.14, "triangle"), index * 120);
  });
};

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const buildRiskGrid = () => {
  riskGrid.innerHTML = "";
  for (let y = 4; y >= 1; y -= 1) {
    for (let x = 1; x <= 4; x += 1) {
      const cell = document.createElement("div");
      cell.className = "risk-cell";
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      cell.addEventListener("dragover", (event) => event.preventDefault());
      cell.addEventListener("drop", (event) => {
        event.preventDefault();
        const threatId = event.dataTransfer.getData("text/plain");
        if (threatId) {
          placeThreatInCell(threatId, cell);
        }
      });
      cell.addEventListener("click", () => {
        if (state.risk.selectedThreatId) {
          placeThreatInCell(state.risk.selectedThreatId, cell);
          state.risk.selectedThreatId = null;
          highlightSelectedCard();
        }
      });
      riskGrid.appendChild(cell);
    }
  }
};

const renderRiskTray = () => {
  riskTray.innerHTML = "";
  riskThreats.forEach((threat) => {
    const threatId = slugify(threat.name);
    const card = document.createElement("div");
    card.className = "risk-card";
    card.textContent = threat.name;
    card.dataset.threatId = threatId;
    card.draggable = true;
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", threatId);
    });
    card.addEventListener("click", () => {
      state.risk.selectedThreatId = threatId;
      highlightSelectedCard();
    });
    riskTray.appendChild(card);
  });
};

const highlightSelectedCard = () => {
  [...riskTray.children].forEach((card) => {
    card.classList.toggle("selected", card.dataset.threatId === state.risk.selectedThreatId);
  });
};

const findThreatById = (threatId) => riskThreats.find((threat) => slugify(threat.name) === threatId);

const updateRiskScore = () => {
  const score = [...state.risk.scores.values()].reduce((total, value) => total + value, 0);
  riskScoreValue.textContent = score;
  return score;
};

const updateRiskBonusMessage = (score) => {
  if (score >= 10) {
    riskBonusMessage.textContent = "Risk bonus unlocked! You will start with an extra £5,000 budget.";
  } else {
    riskBonusMessage.textContent = "No bonus this time, but you can still continue.";
  }
};

const placeThreatInCell = (threatId, cell) => {
  const threat = findThreatById(threatId);
  if (!threat) return;
  const existingCard = cell.querySelector(".risk-card");
  if (existingCard) {
    riskTray.appendChild(existingCard);
    state.risk.placements.delete(existingCard.dataset.threatId);
    state.risk.scores.delete(existingCard.dataset.threatId);
  }

  const card = [...riskTray.children].find((child) => child.dataset.threatId === threatId) ||
    riskGrid.querySelector(`.risk-card[data-threat-id="${threatId}"]`);
  if (card) {
    cell.appendChild(card);
  }

  const placedX = Number(cell.dataset.x);
  const placedY = Number(cell.dataset.y);
  const dx = Math.abs(placedX - threat.recommended.x);
  const dy = Math.abs(placedY - threat.recommended.y);
  let points = 0;
  let message = "Check again.";

  if (dx === 0 && dy === 0) {
    points = 2;
    message = "Good reasoning.";
  } else if (dx <= 1 && dy <= 1) {
    points = 1;
    message = "Close! Check again.";
  }

  state.risk.placements.set(threatId, { x: placedX, y: placedY });
  state.risk.scores.set(threatId, points);
  riskFeedback.textContent = `${message} ${threat.explanation}`;
  playSound(points === 2 ? "success" : "select");

  const score = updateRiskScore();
  updateRiskBonusMessage(score);
  riskContinueBtn.disabled = state.risk.placements.size !== riskThreats.length;
};

const resetRiskPlacements = () => {
  state.risk.placements.clear();
  state.risk.scores.clear();
  state.risk.selectedThreatId = null;
  riskFeedback.textContent = "";
  riskBonusMessage.textContent = "";
  riskContinueBtn.disabled = true;
  renderRiskTray();
  buildRiskGrid();
  updateRiskScore();
  highlightSelectedCard();
};

const showRiskHint = () => {
  riskFeedback.textContent = "Hint: Low probability/low impact goes bottom-left. High probability/high impact goes top-right.";
  const highlightCell = [...riskGrid.children].find(
    (cell) => cell.dataset.x === "4" && cell.dataset.y === "4"
  );
  if (highlightCell) {
    highlightCell.classList.add("highlight");
    setTimeout(() => highlightCell.classList.remove("highlight"), 1600);
  }
};

const applyRiskBonusAndRecommendations = () => {
  const score = updateRiskScore();
  if (score >= 10 && !state.risk.bonusAwarded) {
    state.budget = Math.min(state.budget + 5000, MAX_BUDGET);
    state.risk.bonusAwarded = true;
  }

  const rankedThreats = [...state.risk.placements.entries()]
    .map(([threatId, placement]) => ({
      threat: findThreatById(threatId),
      score: placement.x + placement.y
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const suggestions = new Set();
  rankedThreats.forEach(({ threat }) => {
    threat.suggestions.forEach((item) => suggestions.add(item));
  });
  state.risk.recommendedProtections = [...suggestions];
};

const showScreen = (screen) => {
  Object.values(screens).forEach((section) => section.classList.remove("active"));
  screen.classList.add("active");
};

const updateScoreboard = () => {
  roundCounter.textContent = state.round;
  scoreCounter.textContent = state.score;
  budgetCounter.textContent = formatMoney(state.budget);
};

const resetShopMessage = () => {
  shopMessage.textContent = "";
};

const renderShop = () => {
  if (state.round === 1 && state.risk.recommendedProtections.length > 0) {
    recommendedPanel.classList.remove("hidden");
    recommendedList.innerHTML = state.risk.recommendedProtections
      .map((item) => `<li>${item}</li>`)
      .join("");
  } else {
    recommendedPanel.classList.add("hidden");
    recommendedList.innerHTML = "";
  }

  shopGrid.innerHTML = "";
  protections.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.name = item.name;
    if (state.selectedProtections.has(item.name)) {
      card.classList.add("selected");
    }
    card.innerHTML = `
      <span class="card-icon">${item.icon}</span>
      <div class="badge">${formatMoney(item.cost)}</div>
      <h4>${item.name}</h4>
      <p>${item.description}</p>
    `;
    card.addEventListener("click", () => toggleProtection(item));
    shopGrid.appendChild(card);
  });
  renderSelectedList();
};

const renderSelectedList = () => {
  selectedList.innerHTML = "";
  if (state.selectedProtections.size === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No protections selected yet.";
    selectedList.appendChild(emptyItem);
    continueToIncidentBtn.disabled = false;
    return;
  }

  state.selectedProtections.forEach((name) => {
    const item = document.createElement("li");
    item.textContent = name;
    selectedList.appendChild(item);
  });
  continueToIncidentBtn.disabled = false;
};

const toggleProtection = (item) => {
  resetShopMessage();
  if (state.selectedProtections.has(item.name)) {
    state.selectedProtections.delete(item.name);
    state.budget += item.cost;
    playSound("click");
  } else {
    if (state.budget - item.cost < 0) {
      shopMessage.textContent = "Not enough budget for that protection.";
      playSound("warning");
      return;
    }
    state.selectedProtections.add(item.name);
    state.budget -= item.cost;
    playSound("select");
  }
  updateScoreboard();
  renderShop();
};

const startGame = () => {
  state.round = 1;
  state.score = 0;
  state.budget = STARTING_BUDGET;
  state.selectedProtections = new Set();
  state.incidentsRemaining = shuffle([...incidents]).slice(0, TOTAL_ROUNDS);
  state.incidentHistory = [];
  state.effectiveProtections = new Map();
  state.risk.placements = new Map();
  state.risk.scores = new Map();
  state.risk.selectedThreatId = null;
  state.risk.bonusAwarded = false;
  state.risk.recommendedProtections = [];
  updateScoreboard();
  resetRiskPlacements();
  showScreen(screens.risk);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const startIncident = () => {
  state.currentIncident = state.incidentsRemaining.shift();
  state.attackChoice = null;
  state.protectionChoice = null;
  submitInvestigationBtn.disabled = true;
  incidentCard.innerHTML = `
    <div class="incident-header">
      <span class="incident-icon">${state.currentIncident.icon}</span>
      <div>
        <h3>${state.currentIncident.title}</h3>
        <p>${state.currentIncident.description}</p>
      </div>
    </div>
  `;
  playSound("warning");
  showScreen(screens.incident);
};

const renderInvestigation = () => {
  incidentPrompt.textContent = state.currentIncident.description;
  const selectedProtections = [...state.selectedProtections];
  investigationProtections.textContent = selectedProtections.length
    ? `Protections in place: ${selectedProtections.join(", ")}.`
    : "Protections in place: none yet.";
  attackOptions.innerHTML = "";
  protectionOptions.innerHTML = "";
  attackTypes.forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = type;
    button.addEventListener("click", () => {
      state.attackChoice = type;
      updateOptionSelection(attackOptions, type);
      checkInvestigationReady();
    });
    attackOptions.appendChild(button);
  });

  ["Yes, we stop it", "No, we do not stop it"].forEach((label) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = label;
    button.addEventListener("click", () => {
      state.protectionChoice = label.startsWith("Yes");
      updateOptionSelection(protectionOptions, label);
      checkInvestigationReady();
    });
    protectionOptions.appendChild(button);
  });

  showScreen(screens.investigation);
};

const updateOptionSelection = (container, selectedText) => {
  [...container.children].forEach((button) => {
    button.classList.toggle("selected", button.textContent === selectedText);
  });
};

const checkInvestigationReady = () => {
  submitInvestigationBtn.disabled = !(state.attackChoice && state.protectionChoice !== null);
};

const submitInvestigation = () => {
  const incident = state.currentIncident;
  const attackCorrect = state.attackChoice === incident.attackType;
  const hasCounter = incident.counters.some((counter) => state.selectedProtections.has(counter));
  const protectionCorrect = state.protectionChoice === hasCounter;

  if (attackCorrect) {
    state.score += 1;
  }
  if (protectionCorrect) {
    state.score += 1;
  }
  if (hasCounter) {
    state.score += 1;
  }

  if (attackCorrect && protectionCorrect && hasCounter) {
    playSound("success");
  } else if (attackCorrect || protectionCorrect) {
    playSound("select");
  } else {
    playSound("fail");
  }

  const protectionsInUse = incident.counters.filter((counter) => state.selectedProtections.has(counter));
  protectionsInUse.forEach((counter) => {
    const current = state.effectiveProtections.get(counter) || 0;
    state.effectiveProtections.set(counter, current + 1);
  });

  state.incidentHistory.push({
    title: incident.title,
    attackType: incident.attackType,
    playerChoice: state.attackChoice,
    protectionsUsed: protectionsInUse
  });

  updateScoreboard();
  renderFeedback({ attackCorrect, protectionCorrect, hasCounter, incident, protectionsInUse });
};

const renderFeedback = ({ attackCorrect, protectionCorrect, hasCounter, incident, protectionsInUse }) => {
  const protectionList = incident.counters.join(", ");
  const protectionStatus = hasCounter
    ? `You had ${protectionsInUse.join(", ")} in place.`
    : "You did not have a matching protection in place.";
  const attackClass = attackCorrect ? "correct" : "incorrect";
  const protectionClass = protectionCorrect ? "correct" : "incorrect";
  const attackIcon = attackCorrect ? "✓" : "✕";
  const protectionIcon = protectionCorrect ? "✓" : "✕";

  feedbackContent.innerHTML = `
    <div class="feedback-box ${attackClass}">
      <h3>Attack Identification</h3>
      <p><span class="status-icon">${attackIcon}</span>${attackCorrect ? "Correct" : "Not quite"}. This incident was <strong>${incident.attackType}</strong>.</p>
    </div>
    <div class="feedback-box ${protectionClass}">
      <h3>Protection Check</h3>
      <p><span class="status-icon">${protectionIcon}</span>${protectionCorrect ? "Good call" : "Not quite"}. ${protectionStatus}</p>
      <p><strong>Why:</strong> ${incident.explanation}</p>
      <p><strong>Helpful protections:</strong> ${protectionList}</p>
    </div>
  `;

  nextRoundBtn.textContent = state.round >= TOTAL_ROUNDS ? "See Results" : "Next Round";
  showScreen(screens.feedback);
};

const nextRound = () => {
  if (state.round >= TOTAL_ROUNDS) {
    endGame();
    return;
  }
  state.round += 1;
  state.budget = Math.min(state.budget + ROUND_BUDGET, MAX_BUDGET);
  updateScoreboard();
  renderShop();
  showScreen(screens.shop);
};

const endGame = () => {
  finalScore.textContent = state.score;
  const attackSummary = state.incidentHistory
    .map((incident) => `<li>${incident.title} (<strong>${incident.attackType}</strong>)</li>`)
    .join("");

  const effectiveSummary = [...state.effectiveProtections.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => `<li>${name} helped in ${count} incident${count > 1 ? "s" : ""}.</li>`)
    .join("") || "<li>No protections were effective this time.</li>";

  summaryContent.innerHTML = `
    <div>
      <h3>Attacks Faced</h3>
      <ul>${attackSummary}</ul>
    </div>
    <div>
      <h3>Protections Used Most Effectively</h3>
      <ul>${effectiveSummary}</ul>
    </div>
  `;

  showScreen(screens.end);
};

startGameBtn.addEventListener("click", startGame);
continueToIncidentBtn.addEventListener("click", startIncident);
investigateBtn.addEventListener("click", renderInvestigation);
submitInvestigationBtn.addEventListener("click", submitInvestigation);
nextRoundBtn.addEventListener("click", nextRound);
restartBtn.addEventListener("click", startGame);
riskResetBtn.addEventListener("click", resetRiskPlacements);
riskHintBtn.addEventListener("click", showRiskHint);
riskContinueBtn.addEventListener("click", () => {
  applyRiskBonusAndRecommendations();
  updateScoreboard();
  renderShop();
  showScreen(screens.shop);
});
soundToggleBtn.addEventListener("click", () => {
  audioState.enabled = !audioState.enabled;
  soundToggleBtn.textContent = `Sound: ${audioState.enabled ? "On" : "Off"}`;
  if (audioState.enabled) {
    playSound("click");
  }
});

buildRiskGrid();
renderRiskTray();
updateScoreboard();
