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

function sendWhatsApp(product) {
  let phone = "918110043001";
  let url = `https://wa.me/${phone}?text=I want details about ${product}`;
  window.open(url, "_blank");
}

function sendMessage(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let message = document.getElementById("message").value;

  let url = `https://wa.me/918110043001?text=
Name:${name}
Phone:${phone}
Message:${message}`;

  window.open(url, "_blank");
  document.getElementById("formResponse").innerText =
    "Redirecting to WhatsApp...";
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
