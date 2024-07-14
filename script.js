const items = [
  { name: "cat", image: "./img/cat.webp" },
  { name: "catcute", image: "./img/catcute.webp" },
  { name: "dog", image: "./img/dog.jpg" },
  { name: "elephant", image: "./img/elephant.jpg" },
  { name: "furry", image: "./img/furry.jpg" },
  { name: "koala", image: "./img/koala.webp" },
  { name: "tiger", image: "./img/tiger.jpg" },
  { name: "tiny", image: "./img/tiny.jpg" },
  { name: "wolf", image: "./img/wolf.webp" },
  { name: "wolftiny", image: "./img/wolftiny.jpg" },
];

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".result-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

//initial time
let seconds = 0;
minutes = 0;
//initial moves and win count
let movesCount = 0;
winCount = 0;

//for timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValues = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time: ${minutesValues}:${secondsValue}</span>  `;
};

//for calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:${movesCount}</span> `;
};

//pick random objects of itmes
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `<div class="card-container" data-card-value="${cardValues[i].name}">
    <div class="card-before"><img src="./img/ques.png" class="question"></div>
    <div class="card-after">
    <img src="${cardValues[i].image}" class="image"/></div>
    </div>`;
  }
  //grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Congrat's You Win The Game</h2>
              <h4>Moves:${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//start game
startBtn.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;

  controls.classList.add("hide");
  stopBtn.classList.remove("hide");
  startBtn.classList.add("hide");

  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initalizer();
});

//stop game
stopBtn.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopBtn.classList.add("hide");
    startBtn.classList.remove("hide");
    clearInterval(interval);
  })
);

//initalize values and func calls
const initalizer = () => {
  result.innerHTML = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
