const questions = [
  // {
  //   question: "Какой язык работает в браузере?",
  //   answers: ["Java", "C", "Python", "JavaScript"],
  //   correct: "JavaScript",
  // },
  // {
  //   question: "Что означает CSS?",
  //   answers: [
  //     "Central Style Sheets",
  //     "Cascading Style Sheets",
  //     "Cascading Simple Sheets",
  //     "Cars SUVs Sailboats",
  //   ],
  //   correct: "Cascading Style Sheets",
  // },
  // {
  //   question: "Что означает HTML?",
  //   answers: [
  //     "Hypertext Markup Language",
  //     "Hypertext Markdown Language",
  //     "Hyperloop Machine Language",
  //     "Helicopters Terminals Motorboats Lamborginis",
  //   ],
  //   correct: "Hypertext Markup Language",
  // },
  // {
  //   question: "В каком году был создан JavaScript?",
  //   answers: ["1996", "1995", "1994", "все ответы неверные"],
  //   correct: "1995",
  // },
  {
    question: `Что будет выведено в консоль в результате выполнения данного кода?
    <span class="code">

    function foo() {} <br>
    console.log(typeof foo());

    </span>
    `,
    answers: ["function", "undefined", "null", "number"],
    correct: "undefined",
  },
  {
    question: `Что будет выведено в консоль в результате выполнения данного кода?
    <span class="code">

    const arr1 = [34, 12, 3, 0, 7];<br>
    const arr2 = arr1.sort(<br>
      (a, b) => b - a <br>
      ); <br>
      console.log(arr2);

    </span>
    `,
    answers: ["[0, 12, 3, 34, 7]", "[0, 3, 7, 12, 34]", "[0, 12, 3, 7, 34]", "[34, 12, 7, 3, 0]"],
    correct: "[34, 12, 7, 3, 0]",
  },
  {
    question: `Что будет выведено в консоль в результате выполнения данного кода?
    <span class="code">

    for(let i in { a:0, b:1}){<br>
      console.log(i);<br>
    }
    
    </span>
    `,
    answers: ["0 1", "undefined undefined", "null null", "a b"],
    correct: "a b",
  },
  {
    question: `C помощью какого метода можно создать новый объект с указанными объектом прототипа и свойствами?
    `,
    answers: ["Object.fromEntries()", "Object.create()", "Object.assign()", "Object.is()"],
    correct: "Object.create()",
  },
];

let score = 0;
let questionIndex = 0;

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const subtitle = document.querySelector("#subtitle");

changeColor()
shuffleQuestions(questions)
// Доработать функцию ниже
shuffleAnswers(questions)
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
  let subtitleTemplateNew = subtitleTemplate.replace('%currentQuestion%', questionIndex + 1)
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
      .replace("%number%", answerText);
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

  const userAnswer = checkedRadio.value;

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

function changeColor () {
  // const regExp = /(?<![-.])\b[0-9]+\b(?!\.[0-9])/
  let functionTemplate = `<span class='orange'>function</span>`
  let returnTemplate = `<span class='orange'>return</span>`
  let logTemplate = `<span class='orange'>log</span>`
  let sortTemplate = `<span class='orange'>sort</span>`
  let typeofTemplate = `<span class='orange'>typeof</span>`
  let consoleTemplate = `<span class='blue'>console</span>`
  let forTemplate = `<span class='red'>for</span>`
  let letTemplate = `<span class='red'>let</span>`
  let inTemplate = `<span class='red'>in</span>`
  let constTemplate = `<span class='red'>const</span>`
  questions.map(item=> {
    item.question = item.question.replaceAll('function', functionTemplate)
    item.question = item.question.replaceAll('console', consoleTemplate)
    item.question = item.question.replaceAll('return', returnTemplate)
    item.question = item.question.replaceAll('for', forTemplate)
    item.question = item.question.replaceAll('let', letTemplate)
    item.question = item.question.replaceAll('in', inTemplate)
    item.question = item.question.replaceAll('log', logTemplate)
    item.question = item.question.replaceAll('typeof', typeofTemplate)
    item.question = item.question.replaceAll('const', constTemplate)
    item.question = item.question.replaceAll('sort', sortTemplate)
  })
}