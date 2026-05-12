// Elements
const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");

const countryCard = document.getElementById("countryCard");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

const countryFlag = document.getElementById("countryFlag");
const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const language = document.getElementById("language");
const region = document.getElementById("region");

const copyBtn = document.getElementById("copyBtn");
const lastSearch = document.getElementById("lastSearch");

// =========================
// UI Helpers
// =========================
function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

function showCard() {
  countryCard.classList.remove("hidden");
}

function hideCard() {
  countryCard.classList.add("hidden");
}

// =========================
// Fetch Country
// =========================
async function getCountryData(country) {
  showLoader();
  hideError();
  hideCard();

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    if (!res.ok) throw new Error();

    const data = await res.json();
    const c = data[0];

    updateUI(c);
    saveLastSearch(c.name.common);
    showCard();
  } catch (err) {
    showError();
  } finally {
    hideLoader();
  }
}

// =========================
// Update UI
// =========================
function updateUI(c) {
  countryFlag.src = c.flags.svg;
  countryName.textContent = c.name.common;
  capital.textContent = c.capital?.[0] || "N/A";
  population.textContent = c.population.toLocaleString();
  currency.textContent = Object.values(c.currencies)[0].name;
  language.textContent = Object.values(c.languages).join(", ");
  region.textContent = c.region;
}

// =========================
// Search
// =========================
searchBtn.addEventListener("click", () => {
  const value = countryInput.value.trim();

  if (value) getCountryData(value);
});

// =========================
// Enter Key
// =========================
countryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// =========================
// Random Country
// =========================
randomBtn.addEventListener("click", () => {
  const list = [
    "Algeria",
    "France",
    "Brazil",
    "Japan",
    "Canada",
    "Italy",
    "Germany",
    "India",
  ];

  const random = list[Math.floor(Math.random() * list.length)];

  getCountryData(random);
});

// =========================
// Last Search Feature
// =========================
function saveLastSearch(name) {
  localStorage.setItem("lastCountry", name);
  lastSearch.textContent = "Last search: " + name;
}

// Load last search on start
const saved = localStorage.getItem("lastCountry");

if (saved) {
  lastSearch.textContent = "Last search: " + saved;
}

// =========================
// Copy Info
// =========================
copyBtn.addEventListener("click", () => {
  const text = `${countryName.textContent}
Capital: ${capital.textContent}
Population: ${population.textContent}
Region: ${region.textContent}`;

  navigator.clipboard.writeText(text);

  alert("Copied!");
});
