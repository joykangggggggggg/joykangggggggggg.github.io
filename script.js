let koreanWords = ['아', '바', '사', '나', '다', '라', '마', '가', '하', '카', '타', '파', '자', '차', '카', '타', '파', '하', '거', '너', '더', '러', '머', '버', '서', '어', '저', '처', '커', '터', '퍼', '허'];
let usedWords = [];
let inputWords = [];
let score = 0;
let time = 60;
let timer;
let playerName;
let currentWord;

function getRandomWord() {
    if (koreanWords.length === 0) {
        koreanWords = usedWords;
        usedWords = [];
    }
    let randomIndex = Math.floor(Math.random() * koreanWords.length);
    let selectedWord = koreanWords[randomIndex];
    usedWords.push(selectedWord);
    koreanWords.splice(randomIndex, 1);
    return selectedWord;
}

document.getElementById('startGame').addEventListener('click', () => {
    playerName = document.getElementById('userName').value;
    if (!playerName.trim()) {
        alert('이름을 입력해주세요!');
        return;
    }
    document.getElementById('userName').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';

    currentWord = getRandomWord();
    document.getElementById('givenInitials').innerText = "시작단어: " + currentWord;

    timer = setInterval(() => {
        if (time <= 0) {
            clearInterval(timer);
            document.getElementById('timer').innerText = "게임 끝!";
            document.getElementById('gameArea').style.display = 'none';
            document.getElementById('resultsArea').style.display = 'block';

            let leaderboard = document.getElementById('leaderboard');
            let playerScore = document.createElement('li');
            playerScore.innerText = playerName + ": " + score;
            leaderboard.appendChild(playerScore);

            let wordList = document.getElementById('wordList');
            inputWords.forEach((word) => {
                let listItem = document.createElement('li');
                listItem.innerText = word;
                wordList.appendChild(listItem);
            });
        } else {
            time--;
            document.getElementById('timer').innerText = "남은 시간: " + time + "초";
        }
    }, 1000);
});

document.getElementById('submitWord').addEventListener('click', () => {
    let userInput = document.getElementById('userInput').value;
    inputWords.push(userInput);
    if (userInput.startsWith(currentWord)) {
        score += 3;
    } else {
        score -= 2;
    }
    document.getElementById('score').innerText = "점수: " + score;
    document.getElementById('userInput').value = '';
    currentWord = getRandomWord();
    document.getElementById('givenInitials').innerText = "시작단어: " + currentWord;
});