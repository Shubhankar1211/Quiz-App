document.addEventListener('DOMContentLoaded',()=>{

   const quizContainer = document.getElementById('quiz-container')
   const questionContainer = document.getElementById('question-container')
   const questionText = document.getElementById('question-text')
   const choicesList = document.getElementById('choices-list')
   const nextQuestionButton = document.getElementById('next-btn')
   const result = document.getElementById('result-container')
   const score = document.getElementById('score')
   const restartButton = document.getElementById('restart-btn')
   const startButton = document.getElementById('start-btn')


   const questions = [
    {
      question: "Which team has won the most IPL titles as of 2024?",
      choices: ["Chennai Super Kings", "Mumbai Indians", "Kolkata Knight Riders", "Royal Challengers Bangalore"],
      answer: "Mumbai Indians"
    },
    {
      question: "Who won the Orange Cap in IPL 2023?",
      choices: ["Faf du Plessis", "Virat Kohli", "Shubman Gill", "David Warner"],
      answer: "Shubman Gill"
    },
    {
      question: "Which team was added to the IPL in 2022?",
      choices: ["Lucknow Super Giants", "Sunrisers Hyderabad", "Pune Warriors", "Gujarat Lions"],
      answer: "Lucknow Super Giants"
    },
    {
      question: "Who bowled the fastest delivery in IPL history?",
      choices: ["Anrich Nortje", "Umran Malik", "Jofra Archer", "Lockie Ferguson"],
      answer: "Umran Malik"
    },
    {
      question: "Which player has the highest individual score in IPL history?",
      choices: ["Chris Gayle", "Brendon McCullum", "AB de Villiers", "David Warner"],
      answer: "Chris Gayle"
    }
  ];
  

   


})