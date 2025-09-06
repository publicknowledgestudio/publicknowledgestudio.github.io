/**
 * Interactive Voxel Sketch
 * A responsive p5.js sketch with CSS variable integration
 */

// Configuration object - all settings in one place
const CONFIG = {
  breakpoints: {
    mobile: 800
  },
  canvas: {
    desktop: { size: 640, step: 15 },
    mobile: { size: 360, step: 12 }
  },
  shapes: {
    desktop: { width: 400, height: 60, influenceRadius: 100 },
    mobile: { width: 240, height: 40, influenceRadius: 40 }
  },
  animation: {
    noiseScale: 0.5,
    noiseSpeed: 0.008,
    maxStrength: 150,
    voxelScale: 0.8
  },
  css: {
    background: '--background-color',
    text: '--text-reg',
    voxel: '--voxel-color'
  },
  fallbacks: {
    background: { light: 255, dark: 26 },
    text: { light: [0, 50, 0], dark: [255, 255, 255] },
    voxel: [252, 119, 255]
  }
};

// State management
class SketchState {
  constructor() {
    this.isMobile = false;
    this.isDarkMode = false;
    this.canvasSize = CONFIG.canvas.desktop.size;
    this.step = CONFIG.canvas.desktop.step;
    this.rectW = CONFIG.shapes.desktop.width;
    this.rectH = CONFIG.shapes.desktop.height;
    this.influenceRadius = CONFIG.shapes.desktop.influenceRadius;
  }

  updateResponsive() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < CONFIG.breakpoints.mobile;
    
    if (this.isMobile) {
      this.canvasSize = CONFIG.canvas.mobile.size;
      this.step = CONFIG.canvas.mobile.step;
      this.rectW = CONFIG.shapes.mobile.width;
      this.rectH = CONFIG.shapes.mobile.height;
      this.influenceRadius = CONFIG.shapes.mobile.influenceRadius;
    } else {
      this.canvasSize = CONFIG.canvas.desktop.size;
      this.step = CONFIG.canvas.desktop.step;
      this.rectW = CONFIG.shapes.desktop.width;
      this.rectH = CONFIG.shapes.desktop.height;
      this.influenceRadius = CONFIG.shapes.desktop.influenceRadius;
    }
    
    return wasMobile !== this.isMobile;
  }

  updateDarkMode() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

// Color management
class ColorManager {
  static getCSSVariable(variableName) {
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue(variableName).trim();
  }

  static hexToRgb(colorValue) {
    if (!colorValue) return null;
    
    // Handle rgb() format like "rgb(42, 42, 42)"
    if (colorValue.startsWith('rgb(')) {
      const matches = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (matches) {
        const r = parseInt(matches[1]);
        const g = parseInt(matches[2]);
        const b = parseInt(matches[3]);
        return color(r, g, b);
      }
    }
    
    // Handle hex format like "#FFFFFF" or "FFFFFF"
    let hex = colorValue.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return color(r, g, b);
    }
    
    return null;
  }

  static getBackgroundColor(state) {
    const bgColorHex = this.getCSSVariable(CONFIG.css.background);
    
    if (bgColorHex) {
      return this.hexToRgb(bgColorHex);
    }
    
    // Fallback
    const fallback = state.isDarkMode ? CONFIG.fallbacks.background.dark : CONFIG.fallbacks.background.light;
    return color(fallback);
  }

  static getVoxelColor(distance, influenceRadius, state) {
    if (distance < influenceRadius) {
      // Interactive state - gradient from text color to voxel color
      const t = map(distance, 0, influenceRadius, 1, 0); // Closer = more voxel color
      
      const textColorHex = this.getCSSVariable(CONFIG.css.text);
      const voxelColorHex = this.getCSSVariable(CONFIG.css.voxel);
      
      const textColor = textColorHex ? this.hexToRgb(textColorHex) : this.getFallbackTextColor(state);
      const voxelColor = voxelColorHex ? this.hexToRgb(voxelColorHex) : color(...CONFIG.fallbacks.voxel);
      
      return lerpColor(textColor, voxelColor, t);
    }
    // Normal state - use text color
    const normalColorHex = this.getCSSVariable(CONFIG.css.text);
    return normalColorHex ? this.hexToRgb(normalColorHex) : this.getFallbackTextColor(state);
  }

  static getFallbackTextColor(state) {
    const fallback = state.isDarkMode ? CONFIG.fallbacks.text.dark : CONFIG.fallbacks.text.light;
    return color(...fallback);
  }
}

// Shape utilities
class ShapeUtils {
  static pointInRotatedRect(px, py, cx, cy, w, h, angle) {
    const dx = px - cx;
    const dy = py - cy;
    
    const rotatedX = dx * cos(-angle) - dy * sin(-angle);
    const rotatedY = dx * sin(-angle) + dy * cos(-angle);
    
    return (abs(rotatedX) <= w/2 && abs(rotatedY) <= h/2);
  }

  static isPointInShape(x, y, cx, cy, rectW, rectH) {
    for (let i = 0; i < 4; i++) {
      const angle = i * HALF_PI / 2; // 45°, 135°, 225°, 315°
      if (this.pointInRotatedRect(x, y, cx, cy, rectW, rectH, angle)) {
        return true;
      }
    }
    return false;
  }
}

// Animation utilities
class AnimationUtils {
  static getOffset(x, y, distance, influenceRadius) {
    if (distance >= influenceRadius) {
      return { x: 0, y: 0 };
    }

    const n = noise(x * CONFIG.animation.noiseScale, y * CONFIG.animation.noiseScale, frameCount * CONFIG.animation.noiseSpeed);
    const strength = map(distance, 0, influenceRadius, CONFIG.animation.maxStrength, 0);

    return {
      x: cos(TWO_PI * n) * strength,
      y: sin(TWO_PI * n) * strength
    };
  }
}

// Main sketch class
class VoxelSketch {
  constructor() {
    this.state = new SketchState();
    this.setupEventListeners();
  }

  setup() {
    this.state.updateResponsive();
    this.state.updateDarkMode();
    
    createCanvas(this.state.canvasSize, this.state.canvasSize).parent('p5canvas');
    noStroke();
    rectMode(CENTER);
  }

  draw() {
    this.renderBackground();
    this.renderVoxels();
  }

  renderBackground() {
    const bgColor = ColorManager.getBackgroundColor(this.state);
    background(bgColor);
  }

  renderVoxels() {
    const cx = width / 2;
    const cy = height / 2;

    for (let x = 0; x < width; x += this.state.step) {
      for (let y = 0; y < height; y += this.state.step) {
        if (ShapeUtils.isPointInShape(x, y, cx, cy, this.state.rectW, this.state.rectH)) {
          this.renderVoxel(x, y, cx, cy);
        }
      }
    }
  }

  renderVoxel(x, y, cx, cy) {
    const distance = dist(mouseX, mouseY, x, y);
    const offset = AnimationUtils.getOffset(x, y, distance, this.state.influenceRadius);
    const voxelColor = ColorManager.getVoxelColor(distance, this.state.influenceRadius, this.state);
    
    fill(voxelColor);
    rect(
      x + offset.x, 
      y + offset.y, 
      this.state.step * CONFIG.animation.voxelScale, 
      this.state.step
    );
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => this.handleDarkModeChange());
  }

  handleResize() {
    const needsResize = this.state.updateResponsive();
    if (needsResize) {
      resizeCanvas(this.state.canvasSize, this.state.canvasSize);
    }
  }

  handleDarkModeChange() {
    this.state.updateDarkMode();
  }
}

// Global instance
let sketch;

// p5.js functions
function setup() {
  sketch = new VoxelSketch();
  sketch.setup();
}

function draw() {
  sketch.draw();
}
