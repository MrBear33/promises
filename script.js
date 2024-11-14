// Part 1: Number Facts

// Step 1: Get a Single Fact About Your Favorite Number
function getNumberFact() {
    const favoriteNumber = 7; // Replace with your favorite number
    fetch(`http://numbersapi.com/${favoriteNumber}?json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.text);
            document.getElementById('number-facts').innerHTML += `<p>${data.text}</p>`;
        })
        .catch(error => console.error('Error:', error));
}
getNumberFact();

// Step 2: Get Facts for Multiple Numbers in One Request
function getMultipleNumberFacts() {
    const numbers = [7, 14, 21]; // Replace with your chosen numbers
    fetch(`http://numbersapi.com/${numbers.join(',')}?json`)
        .then(response => response.json())
        .then(data => {
            Object.values(data).forEach(fact => {
                console.log(fact);
                document.getElementById('number-facts').innerHTML += `<p>${fact}</p>`;
            });
        })
        .catch(error => console.error('Error:', error));
}
getMultipleNumberFacts();

// Step 3: Get Four Facts About Your Favorite Number
function getFourFactsAboutNumber() {
    const favoriteNumber = 7; // Replace with your favorite number
    const promises = Array(4).fill(fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(response => response.json()));

    Promise.all(promises)
        .then(facts => {
            facts.forEach(fact => {
                console.log(fact.text);
                document.getElementById('number-facts').innerHTML += `<p>${fact.text}</p>`;
            });
        })
        .catch(error => console.error('Error:', error));
}
getFourFactsAboutNumber();

// Part 2: Deck of Cards

// Step 1: Draw a Single Card
function drawSingleCard() {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        .then(response => response.json())
        .then(data => {
            const card = data.cards[0];
            console.log(`${card.value} of ${card.suit}`);
            document.getElementById('card-area').innerHTML += `<p>${card.value} of ${card.suit}</p>`;
        })
        .catch(error => console.error('Error:', error));
}
drawSingleCard();

// Step 2: Draw Two Cards from the Same Deck
function drawTwoCards() {
    let deckId;
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        })
        .then(response => response.json())
        .then(data => {
            const card1 = data.cards[0];
            console.log(`${card1.value} of ${card1.suit}`);
            document.getElementById('card-area').innerHTML += `<p>${card1.value} of ${card1.suit}</p>`;
            return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        })
        .then(response => response.json())
        .then(data => {
            const card2 = data.cards[0];
            console.log(`${card2.value} of ${card2.suit}`);
            document.getElementById('card-area').innerHTML += `<p>${card2.value} of ${card2.suit}</p>`;
        })
        .catch(error => console.error('Error:', error));
}
drawTwoCards();

// Step 3: Draw Cards with a Button Until Deck is Empty
let deckId;

function initializeDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            document.getElementById('draw-card').addEventListener('click', drawCard);
        })
        .catch(error => console.error('Error:', error));
}

function drawCard() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            if (data.remaining === 0) {
                document.getElementById('draw-card').disabled = true;
                document.getElementById('draw-card').textContent = "No More Cards!";
            }
            const card = data.cards[0];
            const cardHtml = `<p>${card.value} of ${card.suit}</p><img src="${card.image}" alt="${card.value} of ${card.suit}">`;
            document.getElementById('card-area').innerHTML += cardHtml;
        })
        .catch(error => console.error('Error:', error));
}

// Initialize the deck and button
initializeDeck();
