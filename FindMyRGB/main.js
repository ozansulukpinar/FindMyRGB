function refreshPage() {
    document.location.reload(true);
}

//Assign score
var score = 0;

//Assign the answer
var correctBoxName;
var boxesNames = [];
var numberOfBoxes = 0;
var randomNumberInArray;
var newRandomNumberInArray;
var redCodes = [];
var greenCodes = [];
var blueCodes = [];

function drawGame() {
    //Assign number of shape
    //If shapeNumber = 0, it is square; if shapeNumber = 1, it is tree
    var shapeNumber = Math.floor(Math.random() * 2);

    //Assign number of row and column
    //Return a random integer from 5 to 14
    var randomNumber = Math.floor(Math.random() * 10) + 5;
    var rowNumber = randomNumber;
    var columnNumber = randomNumber;

    //Draw boxes
    for (i = 0; i < rowNumber; i++) {
        //row
        for (k = 0; k < columnNumber; k++) {
            //column
            drawBoxes(i, k);
            numberOfBoxes++;
        }

        if (shapeNumber == 1) {
            columnNumber--;
        }
    }

    function drawBoxes(x, y) {
        //Assign RGB code randomly
        var rgb = [];
        for (l = 0; l < 3; l++) {
            var rgbNumber = Math.floor(Math.random() * 256);
            rgb[l] = rgbNumber;
        }

        var div = document.createElement("div");
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.backgroundColor =
            "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
        div.innerHTML = "" + x + "-" + y;

        div.setAttribute("class", "r" + x);
        div.setAttribute("id", "c" + y);

        boxesNames.push("r" + x + "c" + y);
        redCodes.push(rgb[0]);
        greenCodes.push(rgb[1]);
        blueCodes.push(rgb[2]);

        document.getElementById("c" + y).appendChild(div);
    }

    randomNumberInArray = Math.floor(Math.random() * numberOfBoxes);
    correctBoxName = boxesNames[randomNumberInArray];

    //Write the header
    var header = document.createElement("div");
    document.getElementById("heading").appendChild(header);
    header.style.fontSize = "24px";
    header.style.fontWeight = "bold";
    header.innerHTML = "Which color has RGB(" + redCodes[randomNumberInArray] + "," + greenCodes[randomNumberInArray] + "," + blueCodes[randomNumberInArray] + ") color code?";

    //Write the score
    var scoreTable = document.createElement("div");
    document.getElementById("score").appendChild(scoreTable);
    scoreTable.style.fontSize = "18px";
    scoreTable.style.fontWeight = "bold";
    scoreTable.innerHTML = "Score: " + score;
    scoreTable.setAttribute("id", "scoreTable");
}

window.onload = function () {
    drawGame();
};

document.body.onmousedown = function (e) {
    e = e || window.event;
    var elementClass = (e.target || e.srcElement).className;
    var elementId = (e.target || e.srcElement).id;

    clickedBoxName = elementClass + "" + elementId;

    //Assign alert messages
    var alertNumber = Math.floor(Math.random() * 4);
    var winAlertMessage = "";
    var lostAlertMessage = "";

    switch (alertNumber) {
        case 0:
            winAlertMessage = "Congratulations! You win!";
            lostAlertMessage = "Sorry bro!";
            break;
        case 1:
            winAlertMessage = "Great! You win!";
            lostAlertMessage = "Wrong, wrong, wrong!";
            break;
        case 2:
            winAlertMessage = "You have Elven eyes, my lord! You win!";
            lostAlertMessage = "Try again!";
            break;
        case 3:
            winAlertMessage = "Wunderbar! You win!";
            lostAlertMessage = "Carry on, my wayward son!";
            break;
        default:
            winAlertMessage = "";
            lostAlertMessage = "";
    }

    if (correctBoxName == clickedBoxName) {
        score++;

        //Change correct box
        do {
            newRandomNumberInArray = Math.floor(Math.random() * numberOfBoxes);
        } while (newRandomNumberInArray == randomNumberInArray);

        correctBoxName = boxesNames[newRandomNumberInArray];

        //Edit heading
        document.getElementById("heading").innerHTML = "Which color has RGB(" + redCodes[newRandomNumberInArray] + "," + greenCodes[newRandomNumberInArray] + "," + blueCodes[newRandomNumberInArray] + ") color code?"; document.getElementById("heading").style.fontSize = "24px";
        document.getElementById("heading").style.fontWeight = "bold";

        //Edit score
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("score").style.fontSize = "18px";
        document.getElementById("score").style.fontWeight = "bold";

    } else {
        //Answer is false
        alert(lostAlertMessage);
        refreshPage();
    }

    if (score == 5) {
        //Player wins
        alert(winAlertMessage);
        refreshPage();
    }
};