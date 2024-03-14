// games.js
let games = [];
let cart = [];

// Fetch the data from the JSON file
fetch('games.json')
    .then(response => response.json())
    .then(data => {
        // Assign the fetched data to the games array
        games = data;
        // Display the games
        displayGames();
        // Add genres to the select box
        addGenresToSelectBox();
    })
    .catch(error => console.error('Error:', error));

// Voeg deze functies toe aan je JavaScript-bestand
let filteredGames = [];

function filterGames() {
    const priceFilter = document.getElementById('priceFilter').value;
    const genreFilter = document.getElementById('genreFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;

    filteredGames = games.filter(game => {
        return (priceFilter ? game.price < priceFilter : true) &&
            (genreFilter ? game.genre === genreFilter : true) &&
            (ratingFilter ? game.rating < ratingFilter : true);
    });

    displayGames();
}

function displayGames() {
    const gamesList = document.getElementById('gamesList');
    gamesList.innerHTML = '';
    (filteredGames.length > 0 ? filteredGames : games).forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-item'); // Add the class here
        gameElement.innerHTML = `
            <h2>${game.title}</h2>
            <p>Prijs: ${game.price}</p>
            <p>Genre: ${game.genre}</p>
            <p>Rating: ${game.rating}</p>
            <button onclick="addToCart('${game.title}')">Voeg toe aan winkelmandje</button>
        `;
        gamesList.appendChild(gameElement);
    });
}

function addToCart(title) {
    const game = games.find(game => game.title === title);
    cart.push(game);
    alert(`${game.title} is toegevoegd aan het winkelmandje`);
}

function calculatePrice() {
    const totalPrice = cart.reduce((total, game) => total + game.price, 0);
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
    displayCart();
}

function displayCart() {
    document.getElementById('totalOverview').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.innerHTML = `
            <h2>${game.title}</h2>
            <p>Prijs: ${game.price}</p>
            <button onclick="removeFromCart('${game.title}')">Verwijder uit winkelmandje</button>
        `;
        cartList.appendChild(gameElement);
    });
}

function removeFromCart(title) {
    cart = cart.filter(game => game.title !== title);
    calculatePrice();
    displayCart();
}

function addGenresToSelectBox() {
    // Parse the JSON file and extract all the genres
    let genres = games.map(game => game.genre);

    // Remove duplicates
    genres = [...new Set(genres)];

    // Get the select box
    let genreFilter = document.getElementById('genreFilter');

    // Create an HTML option for each genre and append it to the select box
    genres.forEach(genre => {
        let option = document.createElement('option');
        option.value = genre;
        option.text = genre;
        genreFilter.appendChild(option);
    });
}