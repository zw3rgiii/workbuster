const form = document.getElementById("form");
const gameTitle = document.getElementById("game-title");
const gameDesc = document.getElementById("game-description");

console.log(form);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const gameTitleVal = gameTitle.value.trim();
    const gameDescVal = gameDesc.value.trip();

    if (gameTitleVal === '') {
        setErrorFor(gameTitle, 'Please type in any name for the game');
    } else {
        setSuccessFor(gameTitle);
    }

    if (gameDescVal === '') {
        setErrorFor(gameDesc, 'Please write a descriptive text that contains 50-500 words');
    } else {
        setSuccessFor(gameDesc);
    }
}

function setErrorFor(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = msg;

    formControl.className('form-control error')
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className('form-control success')
}