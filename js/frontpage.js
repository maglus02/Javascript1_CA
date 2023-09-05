const url = "https://api.noroff.dev/api/v1/gamehub";
const gamesContainer = document.querySelector(".games");
const gamesToDisplay = [1, 4, 5, 6];

async function fetchGames() {
    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const json = await response.json();

        loader.style.display = "none";

        const games = gamesToDisplay.map(position => json[position]).filter(Boolean);

        games.forEach(function(game) {
            gamesContainer.innerHTML += `<div class="game">
            <div>
            <img class="game-cover" src="${game.image}" alt="Game cover for ${game.title}">
            <a href="games/game.html?id=${game.id}" class="view-game">View game</a>
            </div>
            <h3 class="game-title">${game.title}</h3>
            <h4 class="game-price">$${game.price}</h4>
            </div>`
        })
    } catch (error) {
        loader.style.display = "none";
        gamesContainer.innerHTML = displayError(error);
    }

}

fetchGames();