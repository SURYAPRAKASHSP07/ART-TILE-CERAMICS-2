function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

function calculateTiles() {
  let length = document.getElementById("length").value;
  let width = document.getElementById("width").value;

  if (length && width) {
    let area = length * width;
    let result = Math.ceil(area / 10);
    document.getElementById("result").innerText =
      "Approx boxes required: " + result;
  } else {
    document.getElementById("result").innerText = "Please enter values";
  }
}

const backToTop = document.getElementById("backToTop");

// Show button after scrolling 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Smooth scroll to top
backToTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Footer Fade Animation
const footer = document.querySelector(".modern-footer");

window.addEventListener("scroll", () => {
  const footerPosition = footer.getBoundingClientRect().top;
  const screenPosition = window.innerHeight;

  if (footerPosition < screenPosition - 100) {
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
  }
});

// State to track each of the 3 cards independently
const slideState = { "coll-1": 0, "coll-2": 0, "coll-3": 0 };
const maxTiles = 5;

/**
 * coreMove: The actual sliding logic
 * @param {string} id - The ID of the specific collection card (coll-1, coll-2, or coll-3)
 * @param {number} direction - 1 for Next, -1 for Previous
 */
function coreMove(id, direction) {
  // CRITICAL FIX: Only find the track INSIDE the card with the matching ID
  const container = document.getElementById(id);
  if (!container) return;

  const track = container.querySelector(".slider-track");

  // Update the specific index for this card
  slideState[id] += direction;

  // Loop logic
  if (slideState[id] < 0) slideState[id] = maxTiles - 1;
  if (slideState[id] >= maxTiles) slideState[id] = 0;

  // Move only THIS track
  const distance = slideState[id] * -100;
  track.style.transform = `translateX(${distance}%)`;
}

// Manual Click Function (Stops auto-play so user can look at the tile)
let autoIntervals = {};

function manualMove(id, direction) {
  clearInterval(autoIntervals[id]); // Stop auto-play for THIS card
  coreMove(id, direction);

  // Optional: Restart auto-play after 8 seconds of no clicking
  setTimeout(() => startAutoForCard(id), 8000);
}

// Auto-Play Logic
function startAutoForCard(id) {
  clearInterval(autoIntervals[id]);
  autoIntervals[id] = setInterval(() => {
    coreMove(id, 1);
  }, 4000); // 4 Seconds
}

// Initialize all cards on load
window.onload = () => {
  ["coll-1", "coll-2", "coll-3"].forEach((id) => startAutoForCard(id));
};

document.addEventListener("DOMContentLoaded", function () {
  // 1. Clear any existing timers to prevent "fighting" (The Blinking Fix)
  if (window.countdownTimer) clearInterval(window.countdownTimer);

  function start7DayHook() {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    // Setting start to a Monday (March 16, 2026) so the cycle feels natural
    const startDate = new Date("2026-03-16T00:00:00").getTime();

    const elDays = document.getElementById("days");
    const elHrs = document.getElementById("hours");
    const elMin = document.getElementById("minutes");
    const elSec = document.getElementById("seconds");

    function updateClock() {
      const now = new Date().getTime();
      const passed = now - startDate;
      const remaining = sevenDays - (passed % sevenDays);

      // Calculations
      const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((remaining % (1000 * 60)) / 1000);

      // Only update the text if it has actually changed (Prevents Flickering)
      if (elDays && elDays.innerText !== d.toString()) {
        elDays.innerText = d.toString().padStart(2, "0");
      }
      if (elHrs) elHrs.innerText = h.toString().padStart(2, "0");
      if (elMin) elMin.innerText = m.toString().padStart(2, "0");
      if (elSec) elSec.innerText = s.toString().padStart(2, "0");
    }

    updateClock();
    window.countdownTimer = setInterval(updateClock, 1000);
  }

  start7DayHook();
});

let slides = document.querySelectorAll(".slide");
let dotsContainer = document.querySelector(".dots");
let index = 0;

/* CREATE DOTS */
slides.forEach((_, i) => {
  let dot = document.createElement("span");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});

function showSlide(i) {
  slides[index].classList.remove("active");
  index = i;
  slides[index].classList.add("active");
  updateDots();
}

function nextSlide() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
  updateDots();
}

function prevSlide() {
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");
  updateDots();
}

/* AUTO SLIDE */
let auto = setInterval(nextSlide, 4000);

/* DOT UPDATE */
function updateDots() {
  let dots = document.querySelectorAll(".dots span");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

updateDots();

/* RESET AUTO TIMER */
function resetAuto() {
  clearInterval(auto);
  auto = setInterval(nextSlide, 4000);
}

/* 🔥 SWIPE SUPPORT (MOBILE) */
let startX = 0;

const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextSlide(); // swipe left
    resetAuto();
  } else if (endX - startX > 50) {
    prevSlide(); // swipe right
    resetAuto();
  }
});

// COUNTDOWN STARTS HERE
// function startWeeklyCountdown() {
//   const cycle = 7 * 24 * 60 * 60 * 1000; // 7 Days
//   const baseDate = new Date("2026-01-05T00:00:00").getTime(); // Reference Monday

//   function update() {
//     const now = new Date().getTime();
//     const diff = now - baseDate;
//     const remaining = cycle - (diff % cycle);

//     const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
//     const h = Math.floor(
//       (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//     );
//     const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
//     const s = Math.floor((remaining % (1000 * 60)) / 1000);

//     document.getElementById("days").innerText = d.toString().padStart(2, "0");
//     document.getElementById("hours").innerText = h.toString().padStart(2, "0");
//     document.getElementById("minutes").innerText = m
//       .toString()
//       .padStart(2, "0");
//     document.getElementById("seconds").innerText = s
//       .toString()
//       .padStart(2, "0");
//   }

//   setInterval(update, 1000);
//   update();
// }
// startWeeklyCountdown();

// document.addEventListener("DOMContentLoaded", function () {
//   function start7DayHook() {
//     // 1. Define 7 days in milliseconds
//     const sevenDays = 7 * 24 * 60 * 60 * 1000;

//     // 2. UPDATED REFERENCE: Setting this to TODAY (March 20, 2026)
//     // This ensures the countdown starts fresh from 7 days right now.
//     const startDate = new Date("2026-03-20T00:00:00").getTime();

//     function updateClock() {
//       const now = new Date().getTime();

//       // To prevent negative numbers if 'now' is slightly before 'startDate'
//       const passed = Math.max(0, now - startDate);

//       // The Math that forces the 7-day restart
//       const remaining = sevenDays - (passed % sevenDays);

//       // 3. Time Calculations
//       const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
//       const h = Math.floor(
//         (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//       );
//       const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
//       const s = Math.floor((remaining % (1000 * 60)) / 1000);

//       // 4. Inject into HTML IDs
//       const elDays = document.getElementById("days");
//       const elHrs = document.getElementById("hours");
//       const elMin = document.getElementById("minutes");
//       const elSec = document.getElementById("seconds");

//       if (elDays) {
//         elDays.innerText = d.toString().padStart(2, "0");
//         elHrs.innerText = h.toString().padStart(2, "0");
//         elMin.innerText = m.toString().padStart(2, "0");
//         elSec.innerText = s.toString().padStart(2, "0");
//       }
//     }

//     updateClock();
//     setInterval(updateClock, 1000);
//   }

//   start7DayHook();
// });

// COUNTDOWN ENDS HERE

// ===== DUPLICATE IMAGES FOR INFINITE LOOP =====
const worksTrack = document.getElementById("worksTrack");

// duplicate images for seamless scroll
worksTrack.innerHTML += worksTrack.innerHTML;

// HOMEPAGE TOUCH FUNCTION
function goToPage(page) {
  window.location.href = page;
}

// MODEL GALLRY SILDER
const track = document.getElementById("worksTrack");

let scrollAmount = 0;
const scrollStep = 320; // image width + gap

// BUTTON CONTROL
function moveWorks(direction) {
  scrollAmount += direction * scrollStep;

  // LIMIT SCROLL
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

  if (scrollAmount < 0) scrollAmount = 0;
  if (scrollAmount > maxScroll) scrollAmount = maxScroll;

  track.style.transform = `translateX(-${scrollAmount}px)`;
}

/* ================= DRAG / SWIPE ================= */

let isDown = false;
let scrollLeft;

track.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
});

track.addEventListener("mouseleave", () => {
  isDown = false;
});

track.addEventListener("mouseup", () => {
  isDown = false;
});

track.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const walk = (e.pageX - startX) * 1.5;
  track.style.transform = `translateX(${-scrollAmount + walk}px)`;
});

/* TOUCH (Mobile) */
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
});

track.addEventListener("touchmove", (e) => {
  const walk = (e.touches[0].pageX - startX) * 1.5;
  track.style.transform = `translateX(${-scrollAmount + walk}px)`;
});
