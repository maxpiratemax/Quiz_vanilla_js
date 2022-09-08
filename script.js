const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  // {
  //   question: "Что означает CSS?",
  //   answers: [
  //     "Central Style Sheets",
  //     "Cascading Style Sheets",
  //     "Cascading Simple Sheets",
  //     "Cars SUVs Sailboats",
  //   ],
  //   correct: 2,
  // },
  // {
  //   question: "Что означает HTML?",
  //   answers: [
  //     "Hypertext Markup Language",
  //     "Hypertext Markdown Language",
  //     "Hyperloop Machine Language",
  //     "Helicopters Terminals Motorboats Lamborginis",
  //   ],
  //   correct: 1,
  // },
  // {
  //   question: "В каком году был создан JavaScript?",
  //   answers: ["1996", "1995", "1994", "все ответы неверные"],
  //   correct: 2,
  // },
  // {
  //   question: `Что будет выведено в консоль в результате выполнения данного кода?
  //   <span class="code">function foo() {} <br>
  //   console.log(typeof foo());</span>
  //   `,
  //   answers: ["function", "undefined", "null", "number"],
  //   correct: 2,
  // },
];

let score = 0;
let questionIndex = 0;

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const subtitle = document.querySelector("#subtitle");

shuffleQuestions(questions)
// Доработать функцию ниже
// shuffleAnswers(questions)
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
  subtitle.innerHTML = ""
}

function showQuestion() {
  const subtitleTemplate = `<p id="subtitle">%currentQuestion% / %allQuestions%</p>`
  let subtitleTemplateNew = subtitleTemplate.replace('%currentQuestion%', questionIndex)
  subtitleTemplateNew = subtitleTemplateNew.replace('%allQuestions%', questions.length)  
  subtitle.innerHTML = subtitleTemplateNew

  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex].question
  );

  headerContainer.innerHTML = title;

  for ([index, answerText] of questions[questionIndex].answers.entries()) {
    const questionTemplate = `<li>
				  <label>
					  <input value="%number%" type="radio" class="answer" name="answer" />
					  <span>%answer%</span>
				  </label>
			  </li>`;

    let answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", index + 1);
    listContainer.innerHTML += answerHTML;
  }
}

function checkAnswer() {
  submitBtn.blur();
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );

  if (!checkedRadio) {
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex].correct) {
    score++;
  }

  if (questions.length - 1 !== questionIndex) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultsTemplate = `
  			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
		`;
  let title, message, result;
  if (score === questions.length) {
    title = "Поздравляем! 🎉";
    message = "Вы ответили верно на все вопросы! 😎👍";
  } else if ((score * 100) / questions.length > 50) {
    title = "Неплохой результат! 😉";
    message = "Вы дали более половины правильных ответов! 😎👍";
  } else if ((score * 100) / questions.length == 50) {
    title = "Неплохой результат! 😉";
    message = "Вы дали половину правильных ответов! 😎👍";
  } else {
    title = "Стоит постараться! 😐";
    message = "Пока у вас меньше половины правильных ответов! ";
  }

  result = `${score} из ${questions.length}`;

  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;
  submitBtn.innerText = 'Начать заново'
  submitBtn.onclick = () => history.go()

}

// Мешаем вопросы
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Мешаем варианты ответов
function shuffleAnswers(array) {
  array = array.map(item => {
    shuffleQuestions(item.answers)
  })

}