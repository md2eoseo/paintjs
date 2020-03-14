const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// pixel modifier에 size 지정해야 그릴 수 있음
// css에 size 지정하는건 보여지는 element의 크기임
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// when download the canvas pixel image, erase every transparent part
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

function handleMode(e) {
  filling = !filling;
  if (filling === false) {
    mode.innerText = "Fill";
  } else if (filling === true) {
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSave(e) {
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = data;
  link.download = "canvas";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  colors.forEach(color => color.addEventListener("click", handleColor));
}

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (save) {
  save.addEventListener("click", handleSave);
}
