const textSpan = document.getElementById("textSpan");
const button = document.getElementById("button");
const input = document.getElementById("input");
const answerDiv = document.getElementById("answerDiv");

const newPhrase = () => {
  fetch("./sentences.json")
    .then((response) => response.json())
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * data.phrases.length);
      const randomSentence = data.phrases[randomNumber];
      const germanSentence = randomSentence.german;
      const englishSentence = randomSentence.english;

      console.log(germanSentence);
      console.log(englishSentence);

      textSpan.innerText = englishSentence;

      const checkPhrase = (germanSentence) => {
        const inputValue = input.value;
        if (inputValue === germanSentence) {
          textSpan.classList.add("correct");
          textSpan.innerText = "Correct!";

          setTimeout(() => {
            textSpan.classList.remove("correct");
            input.value = "";
            newPhrase();
          }, 3000);
          return;
        } else {
          textSpan.classList.add("wrong");
          textSpan.innerText = "Wrong!";
          answerDiv.innerText = germanSentence;

          setTimeout(() => {
            answerDiv.innerText = "";
            textSpan.classList.remove("wrong");
            input.value = "";
            newPhrase();
          }, 3000);
          return;
        }
      };

      const handleClick = () => {
        checkPhrase(germanSentence);
      };

      input.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
          event.preventDefault();
          handleClick();
        }
      });

      button.addEventListener("click", () => {
        handleClick();
      });
    })
    .catch((e) => console.log(e));
};
newPhrase();
