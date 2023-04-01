// 랜덤 번호 지정
// 유저가 번호를 입력한 후 go 라는 버튼을 누른다.
// 유저가 랜덤 번호를 맞추면, 맞췄습니다!
// 랜덤 번호가 유저 번호보다 작을 경우 Down!
// 랜덤 번호가 유저 번호보다 클 경우 Up!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 사용하면 게임 종료 : 더이상 추측 불가 / 버튼 disable
// 유저가 0보다 작거나 100보다 큰 숫자를 입력할 경우 알려주며 기회를 사용하지 않는다.
// 유저가 이미 입력한 숫자를 한번 더 입력하면 알려주며 기회를 사용하지 않는다.
// 숫자 입력 칸에 마우스를 클릭할 시 번호가 지워진다.

let randomNum = 0;
let chance = 5;
let userNumHistory = [];

let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");


playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function () {
    userInput.value = "";
})

userInput.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        play();
    }
})


function pickRandomNum() {
    randomNum = Math.floor(Math.random() * 100) + 1 //0부터 1 사이의 랜덤한 숫자를 뽑아주는 함수.
    console.log(`정답 : ${randomNum}`)
}



function play() {

    let userNum = userInput.value; // input의 값 가져온다.

    // 함수가 실행되기 전 값이 유요한지 유효성 검사
    if (userNum < 0 || userNum > 100 || userNum == "" || isNaN(userNum) == true) { //isNaN = Not a Number
        resultArea.textContent = "0 ~ 100 사이의 값을 입력해 주세요."
        return;
    }

    if (userNumHistory.includes(userNum)) {
        resultArea.textContent = "중복된 값을 입력하셨습니다."
        return;
    }

    //----유효성 검사 끝 ----//

    chance--;
    chanceArea.textContent = `${chance}`

    if (randomNum > userNum) {
        resultArea.textContent = "UP!!!"
    }

    else if (randomNum < userNum) {
        resultArea.textContent = "DOWN!!!"
    }

    else if (randomNum == userNum) {
        resultArea.textContent = "정답입니다!!!"
        playButton.disabled = true;
    }

    if (randomNum != userNum && chance == 0) {
        resultArea.textContent = "기회가 모두 소진되었습니다."
        playButton.disabled = true;
    }

    userNumHistory.push(userNum);

    console.log(chance)
    console.log(userNumHistory)

}

function reset() {
    userInput.value = "";
    resultArea.textContent = "숫자를 맞춰보세요!"
    chance = 5;
    chanceArea.textContent = `${chance}`
    pickRandomNum();
}


pickRandomNum();