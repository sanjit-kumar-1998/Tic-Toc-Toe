let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let WinMsg = document.querySelector("#msg");
let msgCont = document.querySelector(".msg-container");

let turnO = true; // player O

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgCont.classList.add("hide");
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showWinner = (pos1Val) => {
    WinMsg.innerText = `Congratulations, Winner is ${pos1Val}`;
    msgCont.classList.remove("hide");
    disableBoxes();
};

const showTie = () => {
    WinMsg.innerText = "The Game is a Tie! start new Game.";
    msgCont.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isTie = true;

    for (let pattern of winningPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Exit if a winner is found
        }
    }

    // Check if all boxes are filled (i.e., no box has an empty value)
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isTie = false; // If any box is empty, it's not a tie yet
        }
    });

    if (isTie) {
        showTie(); // Show tie message if no empty boxes and no winner
    }
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
