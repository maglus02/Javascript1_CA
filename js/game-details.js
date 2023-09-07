const gameDetailContainer = document.querySelector(".game");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

async function fetchGame() {

    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const details = await response.json();

        document.title = `${details.title} | GameHub`;
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute('content', details.description);
        }

        gameDetailContainer.innerHTML = `<img class="game-poster" src="${details.image}" alt="Poster image for ${details.title}">
        <div class="game-info">
        <h1 class="game-title">${details.title}</h1>
        <div class="d-key"><i class="fa-solid fa-key"></i> Digital Key</div>
        <hr class="seperator">
        <h2 class="game-price">$${details.price}</h2>
        <p class="game-desc">${details.description}</p>
        <p class="released"><span class="bolder">Released: </span>${details.released}</p>
        <p class="age-rating"><span class="bolder">Age rating: </span>${details.ageRating}</p>
        <p class="genre"><span class="bolder">Genre: </span>${details.genre}</p>
        <div class="platform">
            <h3>Platform:</h3>
            <div class="platforms">
                <button class="platform-btn">PS5</button>
                <button class="platform-btn">XBOX</button>
                <button class="platform-btn" style="margin-right: 0px;">PC</button>
            </div>
        </div>
        <button class="add-to-cart" data-game-id="${details.id}">Add to cart</button>
        <div class="added-to-cart-msg">
            <span class="added-text">Game added to cart</span>
        </div>
        </div>`

        /*Add to cart function (Level 2)*/
        const addToCartButton = document.querySelector(".add-to-cart");
        const addedToCartMsg = document.querySelector(".added-to-cart-msg");
        addToCartButton.addEventListener("click", function (event) {
            const gameId = event.target.getAttribute("data-game-id");
            const gameDetails = gameId;
            shoppingCart.push(gameDetails);
            saveCartToLocalStorage(shoppingCart);
            addedToCartMsg.style.display = "block";
            setTimeout(function () {
                addedToCartMsg.style.display = "none";
            }, 4000);
            addedToCartMsg.addEventListener("click", function () {
                addedToCartMsg.style.display = "none";
            });
        });
        /*---*/
    } catch (error) {
        loader.style.display = "none";
        gameDetailContainer.innerHTML = displayError(error);
    }
}

fetchGame();