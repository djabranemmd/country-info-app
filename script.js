// Select Elements
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

// Function: Fetch Country Data
async function getCountryData(country) {
  // Show Loader
  loader.style.display = "block";

  // Hide Error
  errorMessage.style.display = "none";

  // Hide Card
  countryCard.classList.add("hidden");

  try {
    // API Request
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`,
    );

    // If Country Not Found
    if (!response.ok) {
      throw new Error("Country not found");
    }

    // Convert To JSON
    const data = await response.json();

    const countryData = data[0];

    // Country Flag
    countryFlag.src = countryData.flags.svg;

    // Country Name
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
    // Show Error
    errorMessage.style.display = "block";

    console.log(error);
  } finally {
    // Hide Loader
    loader.style.display = "none";
  }
}

// Search Button
searchBtn.addEventListener("click", () => {
  const country = countryInput.value.trim();

  if (country !== "") {
    getCountryData(country);
  }
});

// Enter Key
countryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// Random Country Button
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
