const textSpan = document.getElementById("textSpan");
const button = document.getElementById("button");
const input = document.getElementById("input");
const answerDiv = document.getElementById("answerDiv");
const next = document.getElementById("next");
let sentences = [];

let jsonFile = document.location.pathname.replace("html", "json")

const getPhrase = () => {
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * data.phrases.length);
      const randomPhrase = data.phrases[randomNumber];
      const targetLanguageSentence = randomPhrase.targetLanguage;
      const englishSentence = randomPhrase.english;
      sentences = { english: englishSentence, targetLanguage: targetLanguageSentence };
      displayPhrase();
    });
};

const displayPhrase = () => {
  textSpan.innerHTML = sentences.targetLanguage;
  input.value = "";
};

const checkAnswer = () => {
  const userInput = input.value;
  const phraseToCheck = sentences.english.toLowerCase()
  const userInputLowerCase = userInput.toLowerCase()

  
  if (userInputLowerCase.slice(0,-1) === phraseToCheck.slice(0,-1)) {
    textSpan.classList.add("correct");
    textSpan.innerText = "Correct!";
    answerDiv.innerText = "Move to the next one!";

    setTimeout(() => {
      textSpan.classList.remove("correct");
      input.value = "";
      answerDiv.innerText = "";
    }, 3000);
  } else {
    textSpan.classList.add("wrong");
    textSpan.innerText = "Wrong!";
    answerDiv.innerText = "Answer: " + sentences.english;
    input.disabled = true;

    setTimeout(() => {
      input.disabled = false;
      textSpan.classList.remove("wrong");
      input.value = "";
      answerDiv.innerText = "";
    }, 3000);

    textSpan.innerHTML = sentences.targetLanguage;
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
