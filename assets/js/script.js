// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }

    })
    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();
    //create two random numbers between 1 and 25

    if (gameType !== "division") {
        let num1 = Math.floor(Math.random() * 25) + 1;
        let num2 = Math.floor(Math.random() * 25) + 1;
        let num = [];
    } else {
        var endResult = Math.floor(Math.random() * 225) + 1;
        var factors = isNumberPrime(endResult);
        while (factors[0] === true) {  //if factor array at index = 0 says number is prime, try again.
            endResult = Math.floor(Math.random() * 225) + 1;
            factors = isNumberPrime(endResult);

            if (factors[0] === true) {
                continue;
            }
        }

        if (factors.length === 2) { //not prime, but has only factor. 
            num1 = factors[1];
            num = endResult / num1;
        } else {
            let randomIndex = Math.floor(Math.random() * factors.length - 0) + 1;
            num1 = factors[randomIndex]; //not prime, has several factors. randomly select one and continue
            num2 = endResult / num1;
            let randomOperands = [num1, num2]; //out of the two factors, pick one randomly and continue.
            randomIndex = Math.round(Math.random()) + 0;
            num = randomOperands[randomIndex];
        }

    }


    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {

        displayDivideQuestion(endResult, num);
    }

    else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}
/**
 * Takes a random number between 1 and 225 and runs a numerical test for primes 
 * called 'Sieve of Eratosthenes'. Runs a loop from 2 to sqrt of random number.
 * The modulo of each is checked for a remainder of 0. If modulo = 0, adds it to
 * an array. The first element of array in set to true/false accordingly. The array
 * of results are returned for further processing.
 */
function isNumberPrime(randomNumber) {

    let factorsArray = [];
    let boundary = Math.round(Math.sqrt(randomNumber));

    factorsArray[0] = true;
    for (let i = 2; i <= boundary; i++) {
        if (randomNumber % i === 0) {
            factorsArray.push(i);
            if (factorsArray.length > 1) {
                factorsArray[0] = false;

            } else {

            }
        }
    }

    return factorsArray;
}
/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}
/**
 * Gets the operands (the numbers) and the operator )plus, minus, etc.)
 * directly from the dom, and returns the correct asnwer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];

    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    }
    else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }
    else if (operator === "/") {
        return [operand1 / operand2, "division"];
    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

}
/**
 * Get the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}
/**
 * Get the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivideQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}