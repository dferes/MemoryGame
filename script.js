const gameContainer = document.getElementById("game");
let cardsDisplayed = 0;
let lastCard;
let waiting = false;

function setUniqueIds(){
  let counter = 0;
  for (let div_ of gameContainer.children){
     div_.id = counter;
     counter++;
     //console.log(div_);
  }
}


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
  setUniqueIds();
}


function handleCardClick(event) {
    if (cardsDisplayed === 0){
      cardsDisplayed++;
      //waiting = false;
      event.target.style.backgroundColor = event.target.classList.value;
      lastCard = event.target;
    }
      else if (lastCard.id != event.target.id && !waiting){
        event.target.style.backgroundColor = event.target.classList.value;
        if (!(event.target.style.backgroundColor === lastCard.style.backgroundColor)){
          waiting = true;
          setTimeout(function () {
            event.target.style.backgroundColor = "white";
            lastCard.style.backgroundColor = "white";
            lastCard = null;
            cardsDisplayed = 0;
            waiting = false;
          }, 1000);
        }
        else {
          lastCard = null;
          cardsDisplayed = 0;
        }
      }   
}


// when the DOM loads
createDivsForColors(shuffledColors);
