const BASE_URL = "https://deckofcardsapi.com/api/";

// axios
//   .get(`${BASE_URL}deck/new/draw`)
//   .then((res) => {
//     const deckID = res.data.deck_id;
//     const card = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
//     console.log(card);
//     console.log(deckID);
//     return axios.get(`${BASE_URL}deck/${deckID}/draw`);
//   })
//   .then((res) => {
//     console.log(res.data.deck_id);
//     const card = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
//     console.log(card);
//   });

const $btn = $("button");
const $cardsDiv = $("#cards");
let deckID = "";
let remaining;

$btn.on("click", handleClick);

// Check if deck already esists; If not, creates new deck and draws card and updates UI
// If deck exists; Draws new card from Deck and updates UI
async function handleClick(evt) {
  evt.preventDefault();
  if (!deckID) {
    const deckCard = await getNewDeckAndDraw();
    deckID = deckCard.id;
    remaining = deckCard.remaining;
    addCardUI(deckCard);
  } else {
    let newCard = await drawCard(deckID);
    addCardUI(newCard);
    remaining = newCard.remaining;
    if (remaining === 0) {
      $btn.hide();
    }
  }
}

// Creates new deck; Draws first card; Return OBJ of deck_id and card image
function getNewDeckAndDraw() {
  return axios.get(`${BASE_URL}deck/new/draw`).then((res) => {
    return {
      id: res.data.deck_id,
      img: res.data.cards[0].image,
      remaining: res.data.remaining,
    };
  });
}

// Takes in a deckID and draws a new card from deck; Returns OBJ of card img
function drawCard(deckID) {
  return axios.get(`${BASE_URL}deck/${deckID}/draw`).then((res) => {
    return {
      img: res.data.cards[0].image,
      remaining: res.data.remaining,
    };
  });
}

// Takes in OBJ; Updates UI with card Image
function addCardUI(card) {
  const $img = $("<img>")
    .attr("src", card.img)
    .css({
      position: "absolute",
      top: "50%",
      transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
    });
  $cardsDiv.append($img);
}
