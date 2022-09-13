var readlineSync = require('readline-sync');
var chalk = require('chalk');

const redColor = chalk.bold.red;
const cyanColor = chalk.keyword('cyan');
const greenColor = chalk.keyword('green');
const pinkColor = chalk.keyword('pink');
const yellowColor = chalk.keyword('yellow');
const orangeColor = chalk.keyword('orange');

function dash() {
  console.log(
    yellowColor('-----------------------------------------------------')
  );
}

function enter() {
  console.log('\n');
}

const quizQuestions = [
  {
    que: 'What caste is Karna raised in ?',
    options: ['Kshatriya', 'Shudra', 'Brahmin', 'Suta'],
    rightAns: 'd',
  },
  {
    que: 'What famous text does Krsna dictate to Arjuna?',
    options: ['Vedas', 'Mahabharata', 'Bhagavad Gita', 'Upanishads'],
    rightAns: 'c',
  },
  {
    que: 'How many sons does Dhrtarastra have?',
    options: ['101', '100', '1000', '99'],
    rightAns: 'b',
  },
  {
    que: "Who is Pandu's oldest son?",
    options: ['Arjuna', 'Yudhishtira', 'Nakula', 'Karna'],
    rightAns: 'd',
  },
  {
    que: "What is Yudhisthira's dharma?",
    options: [
      'To be great warrior',
      'To start a war',
      'To live as an aesthetic',
      'To rule as king',
    ],
    rightAns: 'd',
  },
];

const topScores = [
  { name: 'krishna', score: 5 },
  { name: 'vitthal', score: 4 },
  { name: 'jayesh', score: 4 },
  { name: 'pandu', score: 3 },
];

function numToChar(num) {
  return String.fromCharCode(65 + num).toLowerCase();
}

function charToNum(char) {
  return char.toUpperCase().charCodeAt(0) - 65;
}

function startQuiz(ourUser) {
  var score = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    console.log(`Q.${i + 1} ${quizQuestions[i].que}`);
    quizQuestions[i].options.forEach((ele, index) => {
      console.log(cyanColor(`${numToChar(index)}) ${ele}`));
    });
    const userAns = readlineSync.question('Choose one: ');
    const correctText =
      quizQuestions[i].options[
        charToNum(quizQuestions[i].rightAns)
      ].toLowerCase();

    if (
      userAns.toLowerCase() === quizQuestions[i].rightAns ||
      userAns.toLowerCase() === correctText
    ) {
      score += 1;
      console.log(greenColor('✅ Correct'));
    } else {
      console.log(redColor('❌ Wrong !!'));
    }
    console.log(pinkColor(`Your current score is: ${score}`));
    dash();
  }

  return { name: ourUser, score };
}

function showHighScores() {
  dash();
  console.log(pinkColor('                ➡ LEADERBOARD ⬅                    '));
  topScores.sort((a, b) => b.score - a.score);
  topScores.forEach(({ name, score }) =>
    console.log(orangeColor(name + ' : ' + score))
  );
  dash();
}

function welcome() {
  var userName = readlineSync.question('What is your name? ') || 'noName';
  console.log(pinkColor(`Welcome ${userName} to MAHABHARATA Quiz`));
  console.log(pinkColor("Let's see if you are a true MAHABHARATA Fan Ⓜ"));
  enter();
  const userNameAndScore = startQuiz(userName);
  enter();
  console.log(
    cyanColor(
      `${userNameAndScore.name}, your final score is: ${userNameAndScore.score}/${quizQuestions.length} ✔`
    )
  );
  enter();
  topScores.push(userNameAndScore);
  showHighScores();
}

welcome();
