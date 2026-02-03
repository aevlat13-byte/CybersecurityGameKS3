const STARTING_BUDGET = 20000;
const ROUND_BUDGET = 20000;
const TOTAL_ROUNDS = 3;

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
  effectiveProtections: new Map()
};

const screens = {
  intro: document.getElementById("screen-intro"),
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
  updateScoreboard();
  renderShop();
  showScreen(screens.shop);
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
  if (protectionCorrect && hasCounter) {
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

  feedbackContent.innerHTML = `
    <div class="feedback-box">
      <h3>Attack Identification</h3>
      <p>${attackCorrect ? "Correct" : "Not quite"}. This incident was <strong>${incident.attackType}</strong>.</p>
    </div>
    <div class="feedback-box">
      <h3>Protection Check</h3>
      <p>${protectionCorrect ? "Good call" : "Not quite"}. ${protectionStatus}</p>
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
  state.budget += ROUND_BUDGET;
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
soundToggleBtn.addEventListener("click", () => {
  audioState.enabled = !audioState.enabled;
  soundToggleBtn.textContent = `Sound: ${audioState.enabled ? "On" : "Off"}`;
  if (audioState.enabled) {
    playSound("click");
  }
});

updateScoreboard();
