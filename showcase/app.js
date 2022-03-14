// Author: Rahul Hegde
// Date: 3/13/2022
//
// Here's a quick and dirty visual showcase of the counter

import Counter from "./Counter.js";
const time = document.querySelector(".time");
const militaryCheckBox = document.querySelector("#military");
let check = militaryCheckBox.checked;

militaryCheckBox.addEventListener("click", () => {
  check = militaryCheckBox.checked;
  time.innerHTML = check ? counter.getMilitaryTime() : counter.getTime();
});

const counter = new Counter();
time.innerHTML = counter.getTime();

setInterval(() => {
  counter.increment();
  time.innerHTML = check ? counter.getMilitaryTime() : counter.getTime();
}, 1000);

function incCounter(t) {
  counter.increment(t);
  time.innerHTML = check ? counter.getMilitaryTime() : counter.getTime();
}
function decCounter(t) {
  counter.decrement(t);
  time.innerHTML = check ? counter.getMilitaryTime() : counter.getTime();
}

const hplus = document.querySelector("#increment-hour");
const mplus = document.querySelector("#increment-minute");
const splus = document.querySelector("#increment-second");
hplus.addEventListener("click", () => {
  incCounter("h");
});
mplus.addEventListener("click", () => {
  incCounter("m");
});
splus.addEventListener("click", () => {
  incCounter("s");
});

const hminus = document.querySelector("#decrement-hour");
const mminus = document.querySelector("#decrement-minute");
const sminus = document.querySelector("#decrement-second");
hminus.addEventListener("click", () => {
  decCounter("h");
});
mminus.addEventListener("click", () => {
  decCounter("m");
});
sminus.addEventListener("click", () => {
  decCounter("s");
});
