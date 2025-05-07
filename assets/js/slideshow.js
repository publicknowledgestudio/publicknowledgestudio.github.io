// slideshow.js
// Automatically converts all <div class="img-carousel"> into interactive carousels

(function () {
    function createCarousel(container) {
      console.log('Found carousel container:', container);
      const images = Array.from(container.getElementsByTagName("img"));
      console.log('Found images:', images.length);
      
      if (images.length < 2) {
        console.log('Skipping carousel - not enough images:', images.length);
        return;
      }
  
      const wrapper = document.createElement("div");
      wrapper.className = "carousel-wrapper";
      console.log('Created wrapper:', wrapper);
  
      const track = document.createElement("div");
      track.className = "carousel-track";
      console.log('Created track:', track);
  
      images.forEach((img, index) => {
        const slide = document.createElement("div");
        slide.className = "carousel-slide";
        slide.appendChild(img);
        // Make the slide clickable
        slide.addEventListener("click", () => goToSlide(index));
        track.appendChild(slide);
        console.log('Added slide:', index, slide);
      });
  
      wrapper.appendChild(track);
      container.appendChild(wrapper);
      console.log('Added wrapper to container');
  
      // Create navigation container
      const navContainer = document.createElement("div");
      navContainer.className = "carousel-nav-container";
  
      // Add dot indicators
      const dots = document.createElement("div");
      dots.className = "carousel-dots";
      images.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (idx === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(idx));
        dots.appendChild(dot);
        console.log('Added dot:', idx, dot);
      });
      navContainer.appendChild(dots);
  
      // Create button container
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "carousel-button-container";
  
      // Add navigation buttons
      const prevButton = document.createElement("button");
      prevButton.className = "carousel-nav square-button prev";
      prevButton.innerText = "←";
      console.log('Created prev button:', prevButton);
  
      const nextButton = document.createElement("button");
      nextButton.className = "carousel-nav square-button next";
      nextButton.innerText = "→";
      console.log('Created next button:', nextButton);
  
      buttonContainer.appendChild(prevButton);
      buttonContainer.appendChild(nextButton);
      navContainer.appendChild(buttonContainer);
      container.insertBefore(navContainer, wrapper);
      console.log('Added navigation container');
  
      let currentIndex = 0;
  
      function updateCarousel() {
        const slides = container.querySelectorAll(".carousel-slide");
        const dotElems = container.querySelectorAll(".dot");
        
        // Update track position using calc
        track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${currentIndex} * var(--spacing-sm)))`;
        
        // Update dots
        dotElems.forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIndex);
        });
  
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
      }
  
      function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
      }
  
      function nextSlide() {
        if (currentIndex < images.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      }
  
      function prevSlide() {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      }
  
      nextButton.addEventListener("click", nextSlide);
      prevButton.addEventListener("click", prevSlide);
  
      // Touch handling
      let startX = null;
      let startY = null;
      let isDragging = false;
      let currentTranslate = 0;
      let isHorizontalSwipe = false;

      function getTranslateX(index) {
        return index === 0 ? 0 : -(index * 100);
      }

      function setTranslateX(translate, targetIndex) {
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        const slideWidth = track.offsetWidth;
        const totalWidth = (slideWidth * images.length) + (gap * (images.length - 1));
        const gapOffset = targetIndex * (gap / totalWidth * 100);
        track.style.transform = `translateX(${translate - gapOffset}%)`;
      }

      track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        isHorizontalSwipe = false;
        currentTranslate = getTranslateX(currentIndex);
      }, { passive: true });

      track.addEventListener("touchmove", e => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - startX;
        const diffY = currentY - startY;

        // If we haven't determined the swipe direction yet
        if (!isHorizontalSwipe) {
          // If the movement is more vertical than horizontal, let the default scroll happen
          if (Math.abs(diffY) > Math.abs(diffX)) {
            isDragging = false;
            return;
          }
          // Otherwise, it's a horizontal swipe
          isHorizontalSwipe = true;
        }

        // Only handle horizontal swipes
        if (isHorizontalSwipe) {
          console.log('Touch move diffX:', diffX);
          const slideWidth = track.offsetWidth;
          const totalWidth = (slideWidth * images.length) + (parseInt(getComputedStyle(track).gap) || 0) * (images.length - 1);
          const diffXPercent = (diffX / totalWidth) * 100;
          const newTranslate = currentTranslate + diffXPercent;
          
          // Calculate the target index based on the translation
          const targetIndex = Math.round(-newTranslate / 100);
          const clampedIndex = Math.max(0, Math.min(images.length - 1, targetIndex));
          
          setTranslateX(newTranslate, clampedIndex);
        }
      }, { passive: true });

      track.addEventListener("touchend", e => {
        if (!isDragging || !isHorizontalSwipe) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;
        const threshold = track.offsetWidth * 0.2; // 20% of width
        
        if (Math.abs(diffX) > threshold) {
          if (diffX > 0 && currentIndex > 0) {
            prevSlide();
          } else if (diffX < 0 && currentIndex < images.length - 1) {
            nextSlide();
          } else {
            updateCarousel();
          }
        } else {
          updateCarousel();
        }
        
        startX = null;
        startY = null;
        isDragging = false;
        isHorizontalSwipe = false;
      }, { passive: true });

      track.addEventListener("touchcancel", () => {
        startX = null;
        startY = null;
        isDragging = false;
        isHorizontalSwipe = false;
        updateCarousel();
      }, { passive: true });
  
      // Initialize the carousel
      updateCarousel();
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      const carousels = document.querySelectorAll(".img-carousel");
      console.log('Found carousels:', carousels.length);
      carousels.forEach(createCarousel);
    });
  })();
  