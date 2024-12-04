const questions = [
    { id: 1, text: "Apa kepanjangan HTML?", type: "text", answer: "Hypertext Markup Language", points: 5 },
    { id: 2, text: "Tag HTML untuk menambahkan gambar adalah?", type: "multiple", options: ["<img>", "<image>", "<picture>", "<src>"], answer: "<img>", points: 5 },
    { id: 3, text: "Apa kepanjangan CSS?", type: "text", answer: "Cascading Style Sheets", points: 5 },
    { id: 4, text: "Properti CSS untuk mengubah warna teks adalah?", type: "multiple", options: ["font-color", "color", "background-color", "text-color"], answer: "color", points: 5 },
    { id: 5, text: "Tag HTML untuk membuat paragraf adalah?", type: "multiple", options: ["<p>", "<h1>", "<paragraph>", "<text>"], answer: "<p>", points: 5 }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

function showPlayerForm() {
    showSection("playerForm");
}

function startQuiz() {
    const name = document.getElementById("name").value;
    const nim = document.getElementById("nim").value;
    if (name && nim) {
        showSection("quiz");
        loadQuestion();
    } else {
        alert("Please enter both name and NIM.");
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = question.text;
    document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1;
    document.getElementById("totalQuestions").textContent = questions.length;
    document.getElementById("answerOptions").innerHTML = "";

    if (question.type === "multiple") {
        question.options.forEach(option => {
            const btn = document.createElement("div");
            btn.className = "answer-option";
            btn.textContent = option;
            btn.onclick = () => selectAnswer(option);
            document.getElementById("answerOptions").appendChild(btn);
        });
    } else if (question.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "textAnswer";
        document.getElementById("answerOptions").appendChild(input);
        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.onclick = () => selectAnswer(input.value);
        document.getElementById("answerOptions").appendChild(submitBtn);
    }

    updateProgress();
    startTimer();
}

function updateProgress() {
    const progressElement = document.getElementById("progress");
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = progressPercent + "%";
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById("timer").textContent = `Waktu tersisa: ${timeLeft} detik`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Waktu tersisa: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer(selectedAnswer) {
    clearInterval(timerInterval);

    const question = questions[currentQuestionIndex];
    if (selectedAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
        score += question.points;
    }
    document.getElementById("score").textContent = score;
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("resultName").textContent = document.getElementById("name").value;
    document.getElementById("resultNim").textContent = document.getElementById("nim").value;
    document.getElementById("totalScore").textContent = score;
    showSection("result");
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("name").value = "";
    document.getElementById("nim").value = "";
    document.getElementById("score").textContent = score;
    showSection("home");
}
