const STARTING_BUDGET = 20000;
const ROUND_BUDGET = 20000;
const TOTAL_ROUNDS = 3;

const protections = [
  { name: "Penetration testers", cost: 20000, description: "Ethical hackers who test your defences." },
  { name: "Regular backups", cost: 10000, description: "Restores data quickly after attacks." },
  { name: "Anti-malware", cost: 10000, description: "Stops malicious software and suspicious files." },
  { name: "Anti-virus", cost: 5000, description: "Detects and removes computer viruses." },
  { name: "Two-factor authentication", cost: 15000, description: "Adds a second check for logins." },
  { name: "Secure password policy", cost: 5000, description: "Strong, unique passwords for everyone." },
  { name: "Upgrade all software", cost: 15000, description: "Closes known security gaps." },
  { name: "ISP traffic regulation", cost: 10000, description: "Your ISP filters harmful traffic." },
  { name: "CAPTCHA", cost: 5000, description: "Blocks automated bot traffic." },
  { name: "Firewall", cost: 20000, description: "Blocks unwanted network access." },
  { name: "Staff training", cost: 20000, description: "Staff spot scams and report issues quickly." }
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
    explanation: "Blagging is social engineering. Trained staff and strict password rules prevent staff from sharing credentials."
  },
  {
    title: "Locked Files Everywhere",
    description: "Employees find their files encrypted with a message demanding payment to unlock them.",
    attackType: "Ransomware",
    counters: ["Regular backups", "Anti-malware"],
    explanation: "Backups restore data and anti-malware blocks the ransomware before it spreads."
  },
  {
    title: "Website Flooded",
    description: "The retailer's website slows down as massive amounts of traffic arrive from unknown sources.",
    attackType: "DDoS",
    counters: ["ISP traffic regulation", "CAPTCHA", "Firewall"],
    explanation: "DDoS attacks are blocked by filtering traffic, CAPTCHAs, and strong firewall rules."
  },
  {
    title: "Password Guessing",
    description: "Your system logs show thousands of rapid login attempts on staff accounts.",
    attackType: "Brute force",
    counters: ["Secure password policy", "Two-factor authentication"],
    explanation: "Strong passwords and two-factor authentication stop automated guessing."
  },
  {
    title: "Unexpected Pop-ups",
    description: "Staff computers display unwanted pop-up adverts and performance is slowing.",
    attackType: "Adware",
    counters: ["Anti-malware", "Staff training"],
    explanation: "Anti-malware removes adware, and trained staff avoid suspicious downloads."
  },
  {
    title: "Mysterious Files",
    description: "An unknown program has been installed and is copying files without permission.",
    attackType: "Spyware",
    counters: ["Anti-malware", "Staff training"],
    explanation: "Anti-malware detects spyware and staff training reduces risky installs."
  },
  {
    title: "Strange Emails",
    description: "An attachment opens and suddenly computers start behaving erratically.",
    attackType: "Virus",
    counters: ["Anti-virus", "Regular backups"],
    explanation: "Anti-virus blocks infections and backups help recover damaged data."
  },
  {
    title: "System Breach",
    description: "Attackers exploit old software to gain access to the network.",
    attackType: "Hacking",
    counters: ["Upgrade all software", "Firewall", "Penetration testers"],
    explanation: "Up-to-date software, firewalls, and penetration testing reduce hacking risk."
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

const startGameBtn = document.getElementById("startGameBtn");
const investigateBtn = document.getElementById("investigateBtn");
const restartBtn = document.getElementById("restartBtn");

const formatMoney = (value) => `£${value.toLocaleString("en-GB")}`;

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
  } else {
    if (state.budget - item.cost < 0) {
      shopMessage.textContent = "Not enough budget for that protection.";
      return;
    }
    state.selectedProtections.add(item.name);
    state.budget -= item.cost;
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
    <h3>${state.currentIncident.title}</h3>
    <p>${state.currentIncident.description}</p>
  `;
  showScreen(screens.incident);
};

const renderInvestigation = () => {
  incidentPrompt.textContent = state.currentIncident.description;
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

updateScoreboard();
