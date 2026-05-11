// Select Elements
const countryInput = document.getElementById("countryInput");

const searchBtn = document.getElementById("searchBtn");

const randomBtn = document.getElementById("randomBtn");

const countryCard = document.getElementById("countryCard");

const loader = document.getElementById("loader");

const errorMessage = document.getElementById("errorMessage");

const themeToggle = document.getElementById("themeToggle");

const favoriteBtn = document.getElementById("favoriteBtn");

const favoritesList = document.getElementById("favoritesList");

const countryFlag = document.getElementById("countryFlag");

const countryName = document.getElementById("countryName");

const capital = document.getElementById("capital");

const population = document.getElementById("population");

const currency = document.getElementById("currency");

const language = document.getElementById("language");

const region = document.getElementById("region");

// Favorites Array
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Current Country
let currentCountry = "";

// =========================
// Theme Mode
// =========================
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");

  themeToggle.textContent = "☀️ Light Mode";
}

// Toggle Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");

    themeToggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "dark");

    themeToggle.textContent = "🌙 Dark Mode";
  }
});

// =========================
// Fetch Country Data
// =========================
async function getCountryData(country) {
  loader.style.display = "block";

  errorMessage.style.display = "none";

  countryCard.classList.add("hidden");

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`,
    );

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();

    const countryData = data[0];

    // Save Current Country
    currentCountry = countryData.name.common;

    // Flag
    countryFlag.src = countryData.flags.svg;

    // Name
    countryName.textContent = countryData.name.common;

    // Capital
    capital.textContent = countryData.capital
      ? countryData.capital[0]
      : "No Capital";

    // Population
    population.textContent = countryData.population.toLocaleString();

    // Currency
    currency.textContent = Object.values(countryData.currencies)[0].name;

    // Language
    language.textContent = Object.values(countryData.languages).join(", ");

    // Region
    region.textContent = countryData.region;

    // Show Card
    countryCard.classList.remove("hidden");
  } catch (error) {
    errorMessage.style.display = "block";

    console.log(error);
  } finally {
    loader.style.display = "none";
  }
}

// =========================
// Add To Favorites
// =========================
favoriteBtn.addEventListener("click", () => {
  if (currentCountry && !favorites.includes(currentCountry)) {
    favorites.push(currentCountry);

    // Save To LocalStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();
  }
});

// =========================
// Render Favorites
// =========================
function renderFavorites() {
  favoritesList.innerHTML = "";

  favorites.forEach((country, index) => {
    const li = document.createElement("li");

    li.classList.add("favorite-item");

    li.innerHTML = `
      <span>${country}</span>

      <button class="delete-btn" onclick="removeFavorite(${index})">
        Delete
      </button>
    `;

    favoritesList.appendChild(li);
  });
}

// =========================
// Remove Favorite
// =========================
function removeFavorite(index) {
  favorites.splice(index, 1);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderFavorites();
}

// =========================
// Search Button
// =========================
searchBtn.addEventListener("click", () => {
  const country = countryInput.value.trim();

  if (country !== "") {
    getCountryData(country);
  }
});

// =========================
// Enter Key
// =========================
countryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// =========================
// Random Country
// =========================
randomBtn.addEventListener("click", () => {
  const countries = [
    "Algeria",
    "France",
    "Brazil",
    "Japan",
    "Canada",
    "Italy",
    "Germany",
    "India",
    "Turkey",
    "Australia",
  ];

  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  getCountryData(randomCountry);
});

// Initial Render
renderFavorites();
