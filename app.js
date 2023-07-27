// Initial vars for drag handle
let isDown = false;
let startY;
let initTop = 400 - 24;
let dragPos = initTop;

// Constant colors for color-bar
const colors = [
  "#ff0000",
  "#ffa500",
  "#ffff00",
  "#008000",
  "#00ffff",
  "#4b0082",
  "#ee82ee",
];
const middleColors = [
  "#ff6666",
  "#ffcc70",
  "#ffff90",
  "#5fff5f",
  "#65ffff",
  "#bb5dff",
  "#be40be",
];
const colorsLerpValues = [
  [
    [255, 102, 102],
    [255, 0, 0],
  ],
  [
    [255, 204, 112],
    [255, 165, 0],
  ],
  [
    [255, 255, 144],
    [255, 255, 0],
  ],
  [
    [95, 255, 95],
    [0, 128, 0],
  ],
  [
    [101, 255, 255],
    [0, 255, 255],
  ],
  [
    [187, 93, 255],
    [75, 0, 130],
  ],
  [
    [190, 64, 190],
    [238, 130, 238],
  ],
];

// Color display vars
let colorsLerpIndex = 0;
let currentColor = getColorRGB(
  dragPos,
  colorsLerpValues[colorsLerpIndex][0],
  colorsLerpValues[colorsLerpIndex][1]
);

// Append event listener for each color button
const colorButtons = document.querySelectorAll(".color-btn");
for (let i = 0; i < 7; i++) {
  colorButtons[i].addEventListener("click", () => {
    colorBar.style.backgroundColor = colors[i];
    colorBar.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, ${middleColors[i]} 50%, ${colors[i]} 100%)`;
    colorsLerpIndex = i;
    currentColor = getColorRGB(
      dragPos,
      colorsLerpValues[colorsLerpIndex][0],
      colorsLerpValues[colorsLerpIndex][1]
    );
    colorDisplay.style.backgroundColor = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
    colorRGB.textContent = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
  });
}

// Query elements
const body = document.querySelector("body");
const colorBar = document.querySelector(".color-bar");
const handle = document.querySelector(".drag-handle");
const colorDisplay = document.querySelector(".color-display");
const colorRGB = document.querySelector(".color-rgb");

// When finish dragging
const end = () => {
  isDown = false;
  initTop = parseInt(handle.style.top.slice(0, -2));
};

// When start dragging
const start = (e) => {
  isDown = true;
  startY = e.pageY || e.touches[0].pageY;
};

// When dragging
const move = (e) => {
  if (!isDown) return;

  const y = e.pageY || e.touches[0].pageY;
  const dist = y - startY;
  dragPos = initTop + dist;
  if (dragPos < 0) {
    dragPos = 0;
    handle.style.top = `${dragPos}px`;
  } else if (dragPos <= 400 - 24) {
    handle.style.top = `${dragPos}px`;
  } else {
    dragPos = 400 - 24;
    handle.style.top = `${dragPos}px`;
  }
  currentColor = getColorRGB(
    dragPos,
    colorsLerpValues[colorsLerpIndex][0],
    colorsLerpValues[colorsLerpIndex][1]
  );
  colorDisplay.style.backgroundColor = `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`;
  colorRGB.textContent = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
};

// Set event handlers for drag handler
handle.addEventListener("mousedown", start);
handle.addEventListener("touchstart", start);

body.addEventListener("mousemove", move);
body.addEventListener("touchmove", move);

handle.addEventListener("mouseup", end);
body.addEventListener("mouseup", end);
body.addEventListener("mouseleave", end);
handle.addEventListener("touchend", end);

// Color and lerp functions
function getColorRGB(i, firstRGB, secondRGB) {
  if (i > 360) {
    return [0, 0, 0];
  } else if (i > 200) {
    return lerp(
      [0, 0, 0],
      [firstRGB[0] / 255, firstRGB[1] / 255, firstRGB[2] / 255],
      (360 - i) / 160
    );
  } else {
    return lerp(
      [firstRGB[0] / 255, firstRGB[1] / 255, firstRGB[2] / 255],
      [secondRGB[0] / 255, secondRGB[1] / 255, secondRGB[2] / 255],
      (200 - i) / 200
    );
  }
}

function lerp(startColor, endColor, value) {
  return [
    Math.round((startColor[0] + (endColor[0] - startColor[0]) * value) * 255),
    Math.round((startColor[1] + (endColor[1] - startColor[1]) * value) * 255),
    Math.round((startColor[2] + (endColor[2] - startColor[2]) * value) * 255),
  ];
}
