const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor");
const range = document.querySelector("#jsRange");

// pixel modifier에 size 지정해야 그릴 수 있음
// css에 size 지정하는건 보여지는 element의 크기임
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
}

function handleRange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  colors.forEach(color => color.addEventListener("click", handleColor));
}

if (range) {
  range.addEventListener("input", handleRange);
}
