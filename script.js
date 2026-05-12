// IMPORTANT FIX: wait DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const countryInput = document.getElementById("countryInput");
  const suggestionsList = document.getElementById("suggestionsList");

  const searchBtn = document.getElementById("searchBtn");
  const randomBtn = document.getElementById("randomBtn");

  const countryCard = document.getElementById("countryCard");
  const loader = document.getElementById("loader");

  const favoriteBtn = document.getElementById("favoriteBtn");
  const favoritesList = document.getElementById("favoritesList");

  const countryName = document.getElementById("countryName");

  let currentCountry = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // ================= SUGGESTIONS FIX =================
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
    "Egypt",
    "Spain",
  ];

  countryInput.addEventListener("input", () => {
    const value = countryInput.value.toLowerCase();

    suggestionsList.innerHTML = "";

    if (!value) return;

    const filtered = countries.filter((c) => c.toLowerCase().includes(value));

    filtered.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = c;

      li.onclick = () => {
        countryInput.value = c;
        suggestionsList.innerHTML = "";
        getCountry(c);
      };

      suggestionsList.appendChild(li);
    });
  });

  // ================= API =================
  async function getCountry(name) {
    loader.style.display = "block";
    countryCard.classList.add("hidden");

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);

      const data = await res.json();
      const c = data[0];

      currentCountry = c.name.common;

      document.getElementById("countryName").textContent = c.name.common;
      document.getElementById("countryFlag").src = c.flags.svg;

      countryCard.classList.remove("hidden");
    } catch (e) {
      alert("Country not found");
    }

    loader.style.display = "none";
  }

  // ================= FAVORITES FIX =================
  favoriteBtn.addEventListener("click", () => {
    if (!currentCountry) return;

    if (!favorites.includes(currentCountry)) {
      favorites.push(currentCountry);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    }
  });

  function renderFavorites() {
    favoritesList.innerHTML = "";

    favorites.forEach((c, i) => {
      const div = document.createElement("div");
      div.className = "favorite-item";

      div.innerHTML = `
      <span onclick="openCountry('${c}')">${c}</span>
      <button onclick="removeFav(${i})">X</button>
    `;

      favoritesList.appendChild(div);
    });
  }

  window.removeFav = function (i) {
    favorites.splice(i, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  };

  window.openCountry = function (name) {
    getCountry(name);
  };

  // init
  renderFavorites();
});
