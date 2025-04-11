document.addEventListener('DOMContentLoaded',()=>{

   //const quizContainer = document.getElementById('quiz-container') // we dont need it because it always visible 
   const questionContainer = document.getElementById('question-container')
   const questionText = document.getElementById('question-text')
   const choicesList = document.getElementById('choices-list')
   const nextButton = document.getElementById('next-btn')
   const resultContainer = document.getElementById('result-container')
   const scoreDisplay = document.getElementById('score')
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
  

  //first things we have to keep a track of is where you are once you have start the quiz allways keep track of the questions
  let currentQuestionIndex =0;
  let score = 0;

  startButton.addEventListener('click', startQuiz) // extract the features like that only pas th reference

  nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    if(currentQuestionIndex< questions.length){
      showQuestion()
    }else{
      showResult();
    }
  })


  restartButton.addEventListener('click',()=>{
    currentQuestionIndex =0
    score =0
    resultContainer.classList.add('hidden')
    startQuiz()
  })
  
  
  function startQuiz(){
      startButton.classList.add('hidden') // first when the quiz start we have to hide the start button 
      resultContainer.classList.add('hidden')
      questionContainer.classList.remove('hidden')
      showQuestion()

  }
   
  
  //first job is done now i will create a conatiner here which goes ahead and shows the questions
  function showQuestion(){
    nextButton.classList.add('hidden')
    // to show questiosn i will have to refer question text
    questionText.textContent = questions[currentQuestionIndex].question
    choicesList.innerHTML ="" // we hacve to referch it why refresh it because this same method of shoe question will be showed innext question where the previous question will be there  that is why we ahve to clear it 
    questions[currentQuestionIndex].choices.forEach(choice =>{ 
        const li = document.createElement('li')
        li.textContent =choice
        li.addEventListener('click',()=> selectAnswer(choice)) // with this callabck fucnton i am passing the refernce of the funtion // if we use selectAnwser() it will execute anser imedatiely but i dont wnat it //i want when someone click on it then the refernce will be passedon than it will execute 
        // main problem in front of me that i can't pass the parameter beacuse oit will exxecute the function just write here solution for this is aboive line use the call back
        choicesList.appendChild(li);
    })
  }

  function selectAnswer(choice){
    const correctAnswer = questions[currentQuestionIndex].answer
    if(choice == correctAnswer){
      score++
    }
    nextButton.classList.remove('hidden');
  }

  function showResult(){
    questionContainer.classList.add('hidden')
    resultContainer.classList.remove('hidden')
    scoreDisplay.textContent =`
    ${score} Out of ${questions.length}`
  }

   


})