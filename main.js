"use strict";

/* VARIABLES */

const btnReset = document.querySelector("#btnNew");
const btnTruco = document.querySelector("#btnTruco");
const btnAdd = document.querySelectorAll("#btnAdd");
const btnMin = document.querySelectorAll("#btnMin");
const score1El = document.querySelector("#score1");
const score2El = document.querySelector("#score2");
const score = document.querySelectorAll("#score");
let score1 = 0;
let score2 = 0;
let win = false;
let points = 1;
let audio = new Audio("./assets/duck.mp3");

/* FUNCTIONS */

const resetAll = function () {
  score1 = 0;
  score2 = 0;
  setDisplay(score1El, score1);
  setDisplay(score2El, score2);
  setDisplay(btnTruco, 1);
  win = false;
  resetPoints();
  document.querySelector("#name1").value = "Jogador 1";
  document.querySelector("#name2").value = "Jogador 2";
};

function resetPoints() {
  points = 1;
  setDisplay(btnTruco, points);
}

function duckSound() {
  audio.play();
}

function setDisplay(element, value) {
  element.textContent = value;
}

const changePoints = function () {
  if (!win)
    if (points == 1) {
      points = 3;
      setDisplay(btnTruco, points);
    } else if (points == 3) {
      points = 6;
      setDisplay(btnTruco, points);
    } else if (points == 6) {
      points = 9;
      setDisplay(btnTruco, points);
    } else if (points == 9) {
      points = 12;
      setDisplay(btnTruco, points);
    }
};

function winVerification() {
  if (score1 >= 12 || score2 >= 12) {
    win = true;
    if (score1 >= 12) {
      setDisplay(score1El, 12);
      document.querySelector("#name1").value = "Vencedor!";
      document.querySelector("#name2").value = "Patinho!";
    } else {
      setDisplay(score2El, 12);
      document.querySelector("#name2").value = "Vencedor!";
      document.querySelector("#name1").value = "Patinho!";
    }
    duckSound();
  }
}

function verification11() {
  if (score1 == 11 || score2 == 11) {
    points = 3;
    setDisplay(btnTruco, points);
  }
}

/* CALLS */

btnTruco.addEventListener("click", changePoints);
btnReset.addEventListener("click", resetAll);
for (let i = 0; i < btnAdd.length; i++) {
  btnAdd[i].addEventListener("click", () => {
    addPoints();
    winVerification();
    verification11();
  });
  btnMin[i].addEventListener("click", () => {
    removePoints();
  });

  function addPoints() {
    if (!win)
      if (i == 0) {
        score1 += points;
        setDisplay(score1El, score1);
      } else {
        score2 += points;
        setDisplay(score2El, score2);
      }
    resetPoints();
  }

  function removePoints() {
    if (!win)
      if (i == 0) {
        if (score1 >= 1) {
          score1--;
          setDisplay(score1El, score1);
        }
      } else {
        if (score2 >= 1) {
          score2--;
          setDisplay(score2El, score2);
        }
      }
  }
}
