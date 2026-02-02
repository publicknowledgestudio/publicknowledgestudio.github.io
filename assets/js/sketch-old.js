// Global variables for responsive design
let isMobile = false;
let canvasSize = 640;
let step = 15;
let rectW = 400;
let rectH = 60;
let influenceRadius = 100;
let isDarkMode = false;


function setup() {
  // Check initial screen size
  checkScreenSize();
  // Check initial dark mode preference
  checkDarkMode();
  createCanvas(canvasSize, canvasSize).parent('p5canvas');
  noStroke();
  rectMode(CENTER);
  
  // Add resize event listener
  window.addEventListener('resize', handleResize);
  // Add dark mode change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleDarkModeChange);
}

function handleResize() {
  checkScreenSize();
  resizeCanvas(canvasSize, canvasSize);
}

function handleDarkModeChange() {
  checkDarkMode();
}

function checkDarkMode() {
  isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getCSSVariable(variableName) {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variableName).trim();
  return value;
}

function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return color(r, g, b);
}

function getVoxelColor(distance, influenceRadius) {
  if (distance < influenceRadius) {
    // Gradient from base color to voxel color based on proximity
    let t = map(distance, 0, influenceRadius, 1, 0); // Closer = more voxel color
    
    // Use text-reg as base color for gradient
    let baseColorHex = getCSSVariable('--text-reg');
    let voxelColorHex = getCSSVariable('--voxel-color');
    
    let baseColor = baseColorHex ? hexToRgb(baseColorHex) : (isDarkMode ? color(255) : color(0, 50, 0));
    let voxelColor = voxelColorHex ? hexToRgb(voxelColorHex) : color(252, 119, 255);
    
    return lerpColor(baseColor, voxelColor, t);
  } else {
    // Normal fill when not affected - use text-reg color
    let normalColorHex = getCSSVariable('--text-reg');
    return normalColorHex ? hexToRgb(normalColorHex) : (isDarkMode ? color(255) : color(0, 50, 0));
  }
}

function checkScreenSize() {
  const wasMobile = isMobile;
  isMobile = window.innerWidth < 800;
  
  if (isMobile) {
    canvasSize = 360;
    step = 12;
    rectW = 240;
    rectH = 40;
    influenceRadius = 40;
  } else {
    canvasSize = 640;
    step = 15;
    rectW = 400;
    rectH = 60;
    influenceRadius = 100;
  }
  
  // Only resize if mobile state changed
  if (wasMobile !== isMobile) {
    resizeCanvas(canvasSize, canvasSize);
  }
}

function draw() {
  // Set background using existing CSS variable
  let bgColorHex = getCSSVariable('--background-color');
  if (bgColorHex) {
    let bgColor = hexToRgb(bgColorHex);
    background(bgColor);
  } else {
    // Fallback to dark mode logic
    if (isDarkMode) {
      background(26, 26, 26); // #1a1a1a
    } else {
      background(255);
    }
  }


  let cx = width / 2;
  let cy = height / 2;

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      let inside = false;

      // check against 4 rotated rects
      for (let i = 0; i < 4; i++) {
        let angle = i * HALF_PI / 2; // 45°, 135°, 225°, 315°
        if (pointInRotatedRect(x, y, cx, cy, rectW, rectH, angle)) {
          inside = true;
          break;
        }
      }

      if (inside) {
        // distance from mouse
        let d = dist(mouseX, mouseY, x, y);

        let offsetX = 0;
        let offsetY = 0;
        
        if (d < influenceRadius) {
          // noise offset based on position + time
          let n = noise(x * 0.5, y * 0.5, frameCount * 0.008);
          let strength = map(d, 0, influenceRadius, 150, 0); // stronger when closer

          offsetX = cos(TWO_PI * n) * strength;
          offsetY = sin(TWO_PI * n) * strength;
        }
        
        // Set color using centralized function
        fill(getVoxelColor(d, influenceRadius));


    
        rect(x + offsetX, y + offsetY, step * 0.8, step );
      }
    }
  }
}

// helper function: check if point is inside a rotated rectangle
function pointInRotatedRect(px, py, cx, cy, w, h, angle) {
  let dx = px - cx;
  let dy = py - cy;

  // rotate point in opposite direction
  let rotatedX = dx * cos(-angle) - dy * sin(-angle);
  let rotatedY = dx * sin(-angle) + dy * cos(-angle);

  return (abs(rotatedX) <= w/2 && abs(rotatedY) <= h/2);
}
