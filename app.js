const CONFIG_URL =
  "https://raw.githubusercontent.com/krishprajapati/MyTvHub/main/sites.json";

async function loadSites() {
  try {
    const response = await fetch(CONFIG_URL);
    const sites = await response.json();

    const grid = document.getElementById("siteGrid");

    grid.innerHTML = "";

    sites.forEach((site) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${site.logo}" alt="${site.title}" />
        <h3>${site.title}</h3>
        <p>${site.description}</p>
      `;
      card.addEventListener("click", () => openIframe(site.url));
      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load site config:", error);
  }
}

function openIframe(url) {
  document.getElementById("app").style.display = "none";
  document.getElementById("iframeContainer").style.display = "block";
  document.getElementById("siteFrame").src = url;
}

function closeIframe() {
  document.getElementById("iframeContainer").style.display = "none";
  document.getElementById("siteFrame").src = "";
  document.getElementById("app").style.display = "block";
}

loadSites();
