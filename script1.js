// Piano, Karl Laurence C.
function detectDevice() {
  const width = window.innerWidth;
  if (width < 600) return 'Mobile';
  else if (width < 992) return 'Tablet';
  else return 'Desktop';
}
document.getElementById('deviceType').textContent = detectDevice();

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selectedCircle = null;
let isDragging = false;
const defaultRadius = 20;
const minRadius = 5;

function isInsideCircle(x, y, circle) {
  const dx = x - circle.x;
  const dy = y - circle.y;
  return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle === selectedCircle ? "red" : "blue";
    ctx.fill();
    ctx.closePath();
  });
}

function getCoordinates(evt) {
  const rect = canvas.getBoundingClientRect();
  let x, y;
  if (evt.touches && evt.touches.length > 0) {
    x = evt.touches[0].clientX - rect.left;
    y = evt.touches[0].clientY - rect.top;
  } else {
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;
  }
  return { x, y };
}

function handleDown(e) {
  const { x, y } = getCoordinates(e);
  let clickedCircle = null;

  for (let i = circles.length - 1; i >= 0; i--) {
    if (isInsideCircle(x, y, circles[i])) {
      clickedCircle = circles[i];
      break;
    }
  }

  if (clickedCircle) {
    selectedCircle = clickedCircle;
    isDragging = true;
  } else {
    const newCircle = { x, y, radius: defaultRadius };
    circles.push(newCircle);
    selectedCircle = newCircle;
  }

  draw();
}

function handleMove(e) {
  if (isDragging && selectedCircle) {
    const { x, y } = getCoordinates(e);
    selectedCircle.x = x;
    selectedCircle.y = y;
    draw();
  }
}

function handleUp() {
  isDragging = false;
}

// Mouse events
canvas.addEventListener("mousedown", handleDown);
canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("mouseup", handleUp);

// Touch events
canvas.addEventListener("touchstart", function(e) {
  e.preventDefault();
  handleDown(e);
}, { passive: false });

canvas.addEventListener("touchmove", function(e) {
  e.preventDefault();
  handleMove(e);
}, { passive: false });

canvas.addEventListener("touchend", function() {
  handleUp();
});

// Scroll to resize
canvas.addEventListener("wheel", function(e) {
  if (selectedCircle) {
    e.preventDefault();
    if (e.deltaY < 0) {
      selectedCircle.radius += 2;
    } else if (selectedCircle.radius > minRadius) {
      selectedCircle.radius -= 2;
    }
    draw();
  }
});

// Keyboard delete (Desktop only)
document.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selectedCircle) {
    circles = circles.filter(circle => circle !== selectedCircle);
    selectedCircle = null;
    draw();
  }
});
