

// let cards = []

// let sum = 0; 
// let hasBlackJack = false
// let isAlive = false
// let message = ""
// let messageEl = document.getElementById("message-el")
// let sumEl = document.getElementById("sum-el")
// let cardsEl = document.getElementById("cards-el")

// let player = {
//     name: "Per",
//     Chips: 145
// }

// let playerEl = document.getElementById("player-el")
// playerEl.textContent = player.name + ": $" + player.Chips

// function getRandomCard() {
//     let rndNo = Math.floor(Math.random() * 13) + 1;
//     if(rndNo === 1) return 11;
//     else if(rndNo > 11 && rndNo < 14) return 10;
//     else return rndNo;
// }

// function startGame() {
//      isAlive = true;
//      let firstCard = getRandomCard();
//      let secondCard = getRandomCard();
//      cards = [firstCard, secondCard]
//      sum = firstCard + secondCard;  

//     renderGame()
// }

// function renderGame() {
//     cardsEl.textContent = "Cards: " 
//     for( let i =0 ; i < cards.length; i++)
//     {
//       cardsEl.textContent += cards[i] + " ";
//     }

//     sumEl.textContent = "Sum: " + sum
//     if (sum <= 20) {
//         message = "Do you want to draw a new card?"
//     } else if (sum === 21) {
//         message = "You've got Blackjack!"
//         hasBlackJack = true
//     } else {
//         message = "You're out of the game!"
//         isAlive = false
//     }
//     messageEl.textContent = message
// }


// function newCard() {
//     if(isAlive === true && hasBlackJack === false ) 
//     {
//         let card = getRandomCard();
//       sum += card
//       cards.push(card)
//       renderGame()
//     }
// }  


// let flr= rollDice();
// console.log(flr);

// function rollDice() {
//     return Math.floor(Math.random() * 6) + 1;
// }

let person = {
    name: "Vishal",
    age: 23,
    country: "India"
}

function logData()
{
   return `${person.name} is ${person.age} years old and lives in ${person.country}`
} 
logData();


function apple() {
    for(let i =0 ;i<fruit.length;i++)
    {
        if(fruit[i]==="apple")
        appleShelf.textContent +=fruit[i];
    }
}