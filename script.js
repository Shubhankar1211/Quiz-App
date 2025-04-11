document.addEventListener('DOMContentLoaded', () => {
  // DOM element references
  const questionContainer = document.getElementById('question-container');
  const questionText = document.getElementById('question-text');
  const choicesList = document.getElementById('choices-list');
  const nextButton = document.getElementById('next-btn');
  const resultContainer = document.getElementById('result-container');
  const scoreDisplay = document.getElementById('score');
  const restartButton = document.getElementById('restart-btn');
  const startButton = document.getElementById('start-btn');
  const progressIndicator = document.createElement('div');
  progressIndicator.id = 'progress-indicator';
  questionContainer.insertBefore(progressIndicator, questionText);

  // Quiz constants
  const QUESTIONS_PER_GAME = 10;
  const LOCAL_STORAGE_KEY = 'ipl_quiz_highscore';

  // Large question bank - 100 IPL questions
  const questionBank = [
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
    },
    {
      question: "In which year was the IPL founded?",
      choices: ["2007", "2008", "2009", "2010"],
      answer: "2008"
    },
    {
      question: "Which player has taken the most wickets in IPL history?",
      choices: ["Lasith Malinga", "Yuzvendra Chahal", "Dwayne Bravo", "Ravichandran Ashwin"],
      answer: "Yuzvendra Chahal"
    },
    {
      question: "Which team won the first IPL season?",
      choices: ["Chennai Super Kings", "Rajasthan Royals", "Deccan Chargers", "Mumbai Indians"],
      answer: "Rajasthan Royals"
    },
    {
      question: "Who was the first player to score a century in IPL?",
      choices: ["Chris Gayle", "Brendon McCullum", "Adam Gilchrist", "Virender Sehwag"],
      answer: "Brendon McCullum"
    },
    {
      question: "Which stadium is known as the home ground of Mumbai Indians?",
      choices: ["Eden Gardens", "M. Chinnaswamy Stadium", "Wankhede Stadium", "Arun Jaitley Stadium"],
      answer: "Wankhede Stadium"
    },
    {
      question: "Which player has hit the most sixes in IPL history?",
      choices: ["Chris Gayle", "Rohit Sharma", "MS Dhoni", "AB de Villiers"],
      answer: "Chris Gayle"
    },
    {
      question: "Which team has the highest team total in IPL history?",
      choices: ["Royal Challengers Bangalore", "Sunrisers Hyderabad", "Kolkata Knight Riders", "Chennai Super Kings"],
      answer: "Royal Challengers Bangalore"
    },
    {
      question: "Who was the first bowler to take a hat-trick in IPL?",
      choices: ["Amit Mishra", "Yuvraj Singh", "Lakshmipathy Balaji", "Harbhajan Singh"],
      answer: "Lakshmipathy Balaji"
    },
    {
      question: "Which team has appeared in the most IPL finals?",
      choices: ["Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bangalore", "Kolkata Knight Riders"],
      answer: "Chennai Super Kings"
    },
    {
      question: "Who was the captain of Kolkata Knight Riders when they won their first IPL title?",
      choices: ["Sourav Ganguly", "Gautam Gambhir", "Dinesh Karthik", "Eoin Morgan"],
      answer: "Gautam Gambhir"
    },
    {
      question: "Which player holds the record for the fastest fifty in IPL?",
      choices: ["Nicholas Pooran", "KL Rahul", "Yusuf Pathan", "Pat Cummins"],
      answer: "Pat Cummins"
    },
    {
      question: "Which IPL team is owned by Shah Rukh Khan?",
      choices: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Delhi Capitals"],
      answer: "Kolkata Knight Riders"
    },
    {
      question: "Which player has won the most IPL MVP (Most Valuable Player) awards?",
      choices: ["Sunil Narine", "Andre Russell", "Shane Watson", "Virat Kohli"],
      answer: "Andre Russell"
    },
    {
      question: "Which city hosted the final of IPL 2023?",
      choices: ["Mumbai", "Chennai", "Ahmedabad", "Delhi"],
      answer: "Ahmedabad"
    },
    {
      question: "Who was the most expensive player in the IPL 2024 auction?",
      choices: ["Mitchell Starc", "Pat Cummins", "Rishabh Pant", "Sam Curran"],
      answer: "Mitchell Starc"
    },
    {
      question: "Which team won the IPL title in 2023?",
      choices: ["Chennai Super Kings", "Gujarat Titans", "Mumbai Indians", "Lucknow Super Giants"],
      answer: "Chennai Super Kings"
    },
    {
      question: "What is the highest successful run chase in IPL history?",
      choices: ["215", "226", "230", "244"],
      answer: "244"
    },
    {
      question: "Who was the first captain of Royal Challengers Bangalore?",
      choices: ["Virat Kohli", "Rahul Dravid", "Kevin Pietersen", "Anil Kumble"],
      answer: "Rahul Dravid"
    },
    {
      question: "Which player has taken the most catches in IPL history?",
      choices: ["Suresh Raina", "Kieron Pollard", "Virat Kohli", "Rohit Sharma"],
      answer: "Kieron Pollard"
    },
    {
      question: "Which IPL franchise has 'Play Bold' as their motto?",
      choices: ["Rajasthan Royals", "Mumbai Indians", "Royal Challengers Bangalore", "Delhi Capitals"],
      answer: "Royal Challengers Bangalore"
    },
    {
      question: "Who was the first player to score 6000 runs in IPL?",
      choices: ["Virat Kohli", "Rohit Sharma", "Suresh Raina", "David Warner"],
      answer: "Virat Kohli"
    },
    {
      question: "Which team has never reached an IPL final?",
      choices: ["Delhi Capitals", "Punjab Kings", "Lucknow Super Giants", "All of these"],
      answer: "Delhi Capitals"
    },
    {
      question: "Which player has the best bowling figures in an IPL match?",
      choices: ["Anil Kumble", "Alzarri Joseph", "Lasith Malinga", "Adam Zampa"],
      answer: "Alzarri Joseph"
    },
    {
      question: "Which two teams competed in the inaugural IPL final in 2008?",
      choices: ["CSK vs RR", "MI vs RCB", "KKR vs PBKS", "DC vs SRH"],
      answer: "CSK vs RR"
    },
    {
      question: "Who holds the record for most consecutive wins as captain in IPL?",
      choices: ["MS Dhoni", "Rohit Sharma", "Gautam Gambhir", "Hardik Pandya"],
      answer: "Rohit Sharma"
    },
    {
      question: "Which IPL player is nicknamed 'Mr. 360'?",
      choices: ["Glenn Maxwell", "Jos Buttler", "AB de Villiers", "David Warner"],
      answer: "AB de Villiers"
    },
    {
      question: "Which team did the IPL introduce 'Impact Player' rule?",
      choices: ["2021", "2022", "2023", "2024"],
      answer: "2023"
    },
    {
      question: "Which player has won the most 'Player of the Match' awards in IPL history?",
      choices: ["Chris Gayle", "AB de Villiers", "Rohit Sharma", "MS Dhoni"],
      answer: "Chris Gayle"
    },
    {
      question: "Which team has the highest win percentage in IPL history?",
      choices: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Gujarat Titans"],
      answer: "Mumbai Indians"
    },
    {
      question: "Who was the first captain to win the IPL title?",
      choices: ["Shane Warne", "MS Dhoni", "Adam Gilchrist", "Sachin Tendulkar"],
      answer: "Shane Warne"
    },
    {
      question: "Which player scored the first double century in IPL?",
      choices: ["Brendon McCullum", "Chris Gayle", "No player has scored a double century", "Shane Watson"],
      answer: "No player has scored a double century"
    },
    {
      question: "Which bowler has taken the most 4-wicket hauls in IPL?",
      choices: ["Lasith Malinga", "Sunil Narine", "Amit Mishra", "Yuzvendra Chahal"],
      answer: "Sunil Narine"
    },
    {
      question: "Which IPL player has the nickname 'Universal Boss'?",
      choices: ["Andre Russell", "Chris Gayle", "Dwayne Bravo", "Kieron Pollard"],
      answer: "Chris Gayle"
    },
    {
      question: "Who hit the longest six in IPL history?",
      choices: ["Albie Morkel", "MS Dhoni", "Chris Gayle", "Yuvraj Singh"],
      answer: "Albie Morkel"
    },
    {
      question: "Which team has the most consecutive wins in IPL history?",
      choices: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Gujarat Titans"],
      answer: "Kolkata Knight Riders"
    },
    {
      question: "Which player was the first to take 100 wickets in IPL?",
      choices: ["Harbhajan Singh", "Amit Mishra", "Lasith Malinga", "Piyush Chawla"],
      answer: "Lasith Malinga"
    },
    {
      question: "Which team has never changed their logo since the inaugural IPL season?",
      choices: ["Mumbai Indians", "Rajasthan Royals", "Royal Challengers Bangalore", "Chennai Super Kings"],
      answer: "Mumbai Indians"
    },
    {
      question: "Who holds the record for the most runs in a single IPL season?",
      choices: ["Virat Kohli", "David Warner", "Jos Buttler", "Chris Gayle"],
      answer: "Virat Kohli"
    },
    {
      question: "Which IPL franchise was temporarily banned for two years (2016-2017)?",
      choices: ["Chennai Super Kings and Rajasthan Royals", "Mumbai Indians and Delhi Capitals", "Royal Challengers Bangalore and Sunrisers Hyderabad", "None of these"],
      answer: "Chennai Super Kings and Rajasthan Royals"
    },
    {
      question: "What is the name of Chennai Super Kings' home ground?",
      choices: ["Eden Gardens", "M.A. Chidambaram Stadium", "Wankhede Stadium", "Arun Jaitley Stadium"],
      answer: "M.A. Chidambaram Stadium"
    },
    {
      question: "Which player has the highest batting strike rate in IPL history (minimum 500 runs)?",
      choices: ["Andre Russell", "Nicholas Pooran", "Sunil Narine", "Hardik Pandya"],
      answer: "Nicholas Pooran"
    },
    {
      question: "What is Royal Challengers Bangalore's home ground?",
      choices: ["M. Chinnaswamy Stadium", "Eden Gardens", "Arun Jaitley Stadium", "Wankhede Stadium"],
      answer: "M. Chinnaswamy Stadium"
    },
    {
      question: "Who was the first player to score 5000 runs in IPL?",
      choices: ["Virat Kohli", "Suresh Raina", "Rohit Sharma", "David Warner"],
      answer: "Virat Kohli"
    },
    {
      question: "Which team has the purple cap winner of IPL 2023?",
      choices: ["Mumbai Indians", "Gujarat Titans", "Chennai Super Kings", "Rajasthan Royals"],
      answer: "Mumbai Indians"
    },
    {
      question: "Who is the youngest captain in IPL history?",
      choices: ["Virat Kohli", "Steve Smith", "Shreyas Iyer", "Rishabh Pant"],
      answer: "Shreyas Iyer"
    },
    {
      question: "What is the highest individual score by an Indian batsman in IPL?",
      choices: ["Virat Kohli - 113", "KL Rahul - 132", "Rishabh Pant - 128*", "Virender Sehwag - 122"],
      answer: "KL Rahul - 132"
    },
    {
      question: "Which player has played the most matches in IPL history?",
      choices: ["MS Dhoni", "Rohit Sharma", "Dinesh Karthik", "Virat Kohli"],
      answer: "MS Dhoni"
    },
    {
      question: "Which bowler has the best economy rate in IPL history (minimum 50 wickets)?",
      choices: ["Rashid Khan", "Sunil Narine", "Jasprit Bumrah", "R Ashwin"],
      answer: "Rashid Khan"
    },
    {
      question: "Who was the first batsman to be dismissed by 'Mankading' in IPL?",
      choices: ["Gautam Gambhir", "Sachin Tendulkar", "Jos Buttler", "Yuvraj Singh"],
      answer: "Jos Buttler"
    },
    {
      question: "Which team has the lowest team total in IPL history?",
      choices: ["Mumbai Indians", "Royal Challengers Bangalore", "Kolkata Knight Riders", "Rajasthan Royals"],
      answer: "Royal Challengers Bangalore"
    },
    {
      question: "Which player has won the most IPL titles?",
      choices: ["MS Dhoni", "Rohit Sharma", "Kieron Pollard", "Ambati Rayudu"],
      answer: "Rohit Sharma"
    },
    {
      question: "Which bowler has taken the most 5-wicket hauls in IPL?",
      choices: ["James Faulkner", "Bhuvneshwar Kumar", "Amit Mishra", "Lasith Malinga"],
      answer: "James Faulkner"
    },
    {
      question: "Who was the first player to hit 300 sixes in IPL?",
      choices: ["Chris Gayle", "MS Dhoni", "Rohit Sharma", "AB de Villiers"],
      answer: "Chris Gayle"
    },
    {
      question: "Which IPL team has never changed their jersey color?",
      choices: ["Chennai Super Kings", "Mumbai Indians", "Royal Challengers Bangalore", "Delhi Capitals"],
      answer: "Chennai Super Kings"
    },
    {
      question: "What was the original name of Delhi Capitals?",
      choices: ["Delhi Daredevils", "Delhi Dynamos", "Delhi Lions", "Delhi Knights"],
      answer: "Delhi Daredevils"
    },
    {
      question: "Which player holds the record for most runs in boundaries (4s and 6s) in a single IPL innings?",
      choices: ["Chris Gayle", "Brendon McCullum", "KL Rahul", "Virat Kohli"],
      answer: "Chris Gayle"
    },
    {
      question: "Which player has hit the most fours in IPL history?",
      choices: ["Shikhar Dhawan", "Virat Kohli", "Rohit Sharma", "David Warner"],
      answer: "Shikhar Dhawan"
    },
    {
      question: "Which team won the IPL in the COVID-19 bubble in UAE (2020)?",
      choices: ["Mumbai Indians", "Delhi Capitals", "Sunrisers Hyderabad", "Chennai Super Kings"],
      answer: "Mumbai Indians"
    },
    {
      question: "Who was the most expensive uncapped player in IPL auction history?",
      choices: ["Tilak Varma", "Riyan Parag", "Shahrukh Khan", "Varun Chakaravarthy"],
      answer: "Shahrukh Khan"
    },
    {
      question: "Which batsman has scored the most runs in successful run chases in IPL?",
      choices: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "David Warner"],
      answer: "Virat Kohli"
    },
    {
      question: "Which team has lost the most finals in IPL history?",
      choices: ["Royal Challengers Bangalore", "Chennai Super Kings", "Mumbai Indians", "Sunrisers Hyderabad"],
      answer: "Royal Challengers Bangalore"
    },
    {
      question: "Which player has won the most 'Emerging Player of the Season' awards in IPL?",
      choices: ["Jasprit Bumrah", "Rishabh Pant", "Shreyas Iyer", "No player has won it twice"],
      answer: "No player has won it twice"
    },
    {
      question: "Who was the first overseas captain to win an IPL title?",
      choices: ["Shane Warne", "Adam Gilchrist", "David Warner", "Kane Williamson"],
      answer: "Shane Warne"
    },
    {
      question: "Which player has scored the most runs in IPL finals?",
      choices: ["Rohit Sharma", "Shane Watson", "MS Dhoni", "Kieron Pollard"],
      answer: "Shane Watson"
    },
    {
      question: "Who was the first player to score 7000 runs in IPL?",
      choices: ["Virat Kohli", "Shikhar Dhawan", "David Warner", "Rohit Sharma"],
      answer: "Virat Kohli"
    },
    {
      question: "Which team had the tagline 'Korbo, Lorbo, Jeetbo'?",
      choices: ["Kolkata Knight Riders", "Rajasthan Royals", "Mumbai Indians", "Chennai Super Kings"],
      answer: "Kolkata Knight Riders"
    },
    {
      question: "Which Indian state has hosted the most IPL finals?",
      choices: ["Maharashtra", "Tamil Nadu", "Karnataka", "Gujarat"],
      answer: "Maharashtra"
    },
    {
      question: "Who hit six sixes in an over in IPL?",
      choices: ["Yuvraj Singh", "Chris Gayle", "Ravindra Jadeja", "No one has achieved this feat in IPL"],
      answer: "No one has achieved this feat in IPL"
    },
    {
      question: "Which bowler has the best bowling figures in an IPL final?",
      choices: ["Anil Kumble", "Lasith Malinga", "Harbhajan Singh", "Karn Sharma"],
      answer: "Anil Kumble"
    },
    {
      question: "Which IPL team has the nickname 'Men in Blue'?",
      choices: ["Mumbai Indians", "Delhi Capitals", "Rajasthan Royals", "Punjab Kings"],
      answer: "Mumbai Indians"
    },
    {
      question: "Which team has won the most consecutive matches at their home ground?",
      choices: ["Chennai Super Kings", "Mumbai Indians", "Kolkata Knight Riders", "Rajasthan Royals"],
      answer: "Chennai Super Kings"
    },
    {
      question: "Who was the first bowler to take 150 wickets in IPL?",
      choices: ["Lasith Malinga", "Amit Mishra", "Harbhajan Singh", "Dwayne Bravo"],
      answer: "Lasith Malinga"
    },
    {
      question: "Which player has the record for scoring the fastest century (in terms of balls faced) in IPL?",
      choices: ["Chris Gayle", "AB de Villiers", "David Miller", "KL Rahul"],
      answer: "Chris Gayle"
    },
    {
      question: "Which team has qualified for the playoffs/knockouts the most times?",
      choices: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Royal Challengers Bangalore"],
      answer: "Mumbai Indians"
    },
    {
      question: "Which player has taken the most catches as a wicketkeeper in IPL?",
      choices: ["MS Dhoni", "Dinesh Karthik", "Robin Uthappa", "Quinton de Kock"],
      answer: "MS Dhoni"
    },
    {
      question: "Who was the first captain to win the IPL title for CSK?",
      choices: ["MS Dhoni", "Suresh Raina", "Ravindra Jadeja", "Ruturaj Gaikwad"],
      answer: "MS Dhoni"
    },
    {
      question: "Which player has played for the most different franchises in IPL?",
      choices: ["Dinesh Karthik", "Robin Uthappa", "Ajinkya Rahane", "Manish Pandey"],
      answer: "Robin Uthappa"
    },
    {
      question: "Who was the first spinner to win the Purple Cap in IPL?",
      choices: ["Imran Tahir", "Yuzvendra Chahal", "Rashid Khan", "Harbhajan Singh"],
      answer: "Imran Tahir"
    },
    {
      question: "Which team has the longest winning streak in IPL history?",
      choices: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders", "Delhi Capitals"],
      answer: "Kolkata Knight Riders"
    },
    {
      question: "Which Indian city made its IPL hosting debut in 2023?",
      choices: ["Guwahati", "Lucknow", "Dharamsala", "Navi Mumbai"],
      answer: "Guwahati"
    },
    {
      question: "Who scored the first century by a wicketkeeper in IPL?",
      choices: ["Adam Gilchrist", "MS Dhoni", "Quinton de Kock", "KL Rahul"],
      answer: "Adam Gilchrist"
    },
    {
      question: "Which team's home ground is Narendra Modi Stadium?",
      choices: ["Gujarat Titans", "Rajasthan Royals", "Punjab Kings", "Lucknow Super Giants"],
      answer: "Gujarat Titans"
    },
    {
      question: "Which player holds the record for most runs in a single IPL match?",
      choices: ["Brendon McCullum", "Chris Gayle", "AB de Villiers", "Quinton de Kock"],
      answer: "Chris Gayle"
    },
    {
      question: "Which bowler has taken the most wickets in powerplay overs in IPL history?",
      choices: ["Bhuvneshwar Kumar", "Deepak Chahar", "Mohammed Shami", "Trent Boult"],
      answer: "Bhuvneshwar Kumar"
    },
    {
      question: "Who was the first Indian player to score a century in IPL?",
      choices: ["Manish Pandey", "Virender Sehwag", "Yusuf Pathan", "Murali Vijay"],
      answer: "Manish Pandey"
    },
    {
      question: "Which team has the highest score in powerplay overs in IPL?",
      choices: ["Kolkata Knight Riders", "Royal Challengers Bangalore", "Punjab Kings", "Chennai Super Kings"],
      answer: "Kolkata Knight Riders"
    },
    {
      question: "Who was the youngest player to play in the IPL?",
      choices: ["Prayas Ray Barman", "Riyan Parag", "Mujeeb Ur Rahman", "Yashasvi Jaiswal"],
      answer: "Prayas Ray Barman"
    },
    {
      question: "Which overseas player has captained the most IPL matches?",
      choices: ["David Warner", "Kane Williamson", "AB de Villiers", "Steve Smith"],
      answer: "David Warner"
    },
    {
      question: "Which IPL final had the highest victory margin (by runs)?",
      choices: ["2019", "2017", "2020", "2022"],
      answer: "2019"
    },
    {
      question: "Which batter has the most 50+ scores in IPL history?",
      choices: ["David Warner", "Virat Kohli", "Shikhar Dhawan", "Rohit Sharma"],
      answer: "David Warner"
    },
    {
      question: "In which year did IPL introduce the 'Strategic Timeout'?",
      choices: ["2009", "2010", "2011", "2012"],
      answer: "2009"
    },
    {
      question: "Who holds the record for the highest individual score in an IPL final?",
      choices: ["Shane Watson", "Wriddhiman Saha", "Aditya Tare", "MS Dhoni"],
      answer: "Wriddhiman Saha"
    }
  ];

  // Quiz state variables
  let currentQuestions = []; // Will store the randomly selected questions for this game
  let currentQuestionIndex = 0;
  let score = 0;
  let highScore = localStorage.getItem(LOCAL_STORAGE_KEY) || 0;

  // Event listeners
  startButton.addEventListener('click', startQuiz);

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < QUESTIONS_PER_GAME) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartButton.addEventListener('click', () => {
    startQuiz();
  });

  // Initialize high score from local storage
  updateHighScoreDisplay();

  function startQuiz() {
    startButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Select random questions
    currentQuestions = getRandomQuestions(questionBank, QUESTIONS_PER_GAME);
    
    showQuestion();
  }

  function getRandomQuestions(allQuestions, count) {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function showQuestion() {
    nextButton.classList.add('hidden');
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    // Update progress indicator
    progressIndicator.textContent = `Question ${currentQuestionIndex + 1}/${QUESTIONS_PER_GAME}`;
    
    questionText.textContent = currentQuestion.question;
    choicesList.innerHTML = ""; // Clear previous choices
    
    currentQuestion.choices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, selectedElement) {
    // Remove any previous selection styling
    const allChoices = choicesList.querySelectorAll('li');
    allChoices.forEach(item => {
      item.classList.remove('correct', 'incorrect');
    });
    
    const correctAnswer = currentQuestions[currentQuestionIndex].answer;
    
    if (choice === correctAnswer) {
      score++;
      selectedElement.classList.add('correct');
    } else {
      selectedElement.classList.add('incorrect');
      
      // Highlight the correct answer
      allChoices.forEach(item => {
        if (item.textContent === correctAnswer) {
          item.classList.add('correct');
        }
      });
    }
    
    // Disable further selections for this question
    allChoices.forEach(item => {
      item.style.pointerEvents = 'none';
    });
    
    nextButton.classList.remove('hidden');
  }

  function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    // Update score display
    scoreDisplay.textContent = `${score} Out of ${QUESTIONS_PER_GAME}`;
    
    // Update high score if current score is higher
    if (score > highScore) {
      highScore = score;
      localStorage.setItem(LOCAL_STORAGE_KEY, highScore);
      updateHighScoreDisplay();
      
      // Add an animation or message for new high score
      const newHighScoreMsg = document.createElement('p');
      newHighScoreMsg.textContent = "🎉 New High Score! 🎉";
      newHighScoreMsg.className = "high-score-alert";
      resultContainer.insertBefore(newHighScoreMsg, restartButton);
    }
  }
  
  function updateHighScoreDisplay() {
    // Create high score element if it doesn't exist
    let highScoreElement = document.getElementById('high-score');
    if (!highScoreElement) {
      highScoreElement = document.createElement('p');
      highScoreElement.id = 'high-score';
      resultContainer.insertBefore(highScoreElement, restartButton);
    }
    highScoreElement.textContent = `High Score: ${highScore} / ${QUESTIONS_PER_GAME}`;
  }
});








/*

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

*/