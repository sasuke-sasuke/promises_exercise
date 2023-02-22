const BASE_URL = "http://numbersapi.com/";
const $numFacts = $("#num-facts");
const $multFacts = $("#mult-facts");
/// Part 1: Number Facts
const favNumFact = axios
  .get(`${BASE_URL}3?json`)
  .then((res) => console.log(res))
  .catch((e) => console("Something went wrong", e));

const numsFact = axios.get(`${BASE_URL}3..9`).then((res) => {
  nums = res.data;
  for (const num in nums) {
    const $li = $("<li>").text(`${nums[num]}`);
    $numFacts.append($li);
  }
});

function getFourFacts(num) {
  const facts = [];
  for (let i = 0; i < 4; i++) {
    facts.push(axios.get(`${BASE_URL}${num}?json`));
  }

  Promise.all(facts)
    .then((factsArr) => {
      for (let fact of factsArr) {
        const $li = $("<li>").text(fact.data.text);
        $multFacts.append($li);
      }
    })
    .catch((e) => console.log(e));
}

getFourFacts(3);
