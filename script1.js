//Piano, Karl Laurence C.
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


canvas.addEventListener("mousedown", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  let clickedCircle = null;

  
  for (let i = circles.length - 1; i >= 0; i--) {
    if (isInsideCircle(mouseX, mouseY, circles[i])) {
      clickedCircle = circles[i];
      break;
    }
  }

  if (clickedCircle) {
    selectedCircle = clickedCircle;
    isDragging = true;
  } else {
    
    const newCircle = { x: mouseX, y: mouseY, radius: defaultRadius };
    circles.push(newCircle);
    selectedCircle = newCircle;
  }

  draw();
});


canvas.addEventListener("mousemove", function(e) {
  if (isDragging && selectedCircle) {
    const rect = canvas.getBoundingClientRect();
    selectedCircle.x = e.clientX - rect.left;
    selectedCircle.y = e.clientY - rect.top;
    draw();
  }
});


canvas.addEventListener("mouseup", function() {
  isDragging = false;
});


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


document.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selectedCircle) {
    circles = circles.filter(circle => circle !== selectedCircle);
    selectedCircle = null;
    draw();
  }
});
