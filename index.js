const textSpan = document.getElementById("textSpan");
const button = document.getElementById("button");
const input = document.getElementById("input");
const answerDiv = document.getElementById("answerDiv");
const next = document.getElementById("next");
let sentences = [];

const getPhrase = () => {
  fetch("./sentences.json")
    .then((response) => response.json())
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * data.phrases.length);
      const randomPhrase = data.phrases[randomNumber];
      const germanSentence = randomPhrase.german;
      const englishSentence = randomPhrase.english;
      sentences = { english: englishSentence, german: germanSentence };
      displayPhrase();
    });
};

const displayPhrase = () => {
  textSpan.innerHTML = sentences.german;
  input.value = "";
};

const checkAnswer = () => {
  const userInput = input.value;

  if (userInput === sentences.english) {
    textSpan.classList.add("correct");
    textSpan.innerText = "Correct!";
    answerDiv.innerText = "Move to the next one.";

    setTimeout(() => {
      textSpan.classList.remove("correct");
      input.value = "";
      answerDiv.innerText = "";
    }, 3000);
  } else {
    textSpan.classList.add("wrong");
    textSpan.innerText = "Wrong!";
    answerDiv.innerText = "Answer: " + sentences.english;

    setTimeout(() => {
      textSpan.classList.remove("wrong");
      input.value = "";
      answerDiv.innerText = "";
    }, 3000);

    textSpan.innerHTML = sentences.german;
  }
};

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
    checkAnswer();
  }
});
button.addEventListener("click", () => {
  checkAnswer();
});
next.addEventListener("click", () => {
  getPhrase();
});

getPhrase();
