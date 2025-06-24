// rain
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("game.html")) return;

  const rainContainer = document.createElement("div");
  rainContainer.className = "rain";

  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    drop.style.animationDelay = Math.random() * 5 + "s";
    rainContainer.appendChild(drop);
  }

  document.body.appendChild(rainContainer);
});
// star
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("game.html")) return;

  const starContainer = document.createElement("div");
  starContainer.className = "stars";
  document.body.appendChild(starContainer);

  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDelay = Math.random() * 5 + "s";
    starContainer.appendChild(star);
  }
});

// backToTop
document.addEventListener("DOMContentLoaded", function () {
  const topBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// letter popup
document.addEventListener("DOMContentLoaded", function () {
  const envelopes = document.querySelectorAll(".envelope");

  envelopes.forEach(envelope => {
    envelope.addEventListener("click", function () {
      const message = this.getAttribute("data-message");
      const name = this.getAttribute("data-name");
      const user = this.getAttribute("data-user");
      const sender = name && user ? `${name}（${user}）` : name || user || "";

      const popup = document.createElement("div");
      popup.className = "letter-popup";
      popup.innerHTML = `
        <div class="content">${message}</div>
        <span class="sender">― ${sender}</span>
      `;

      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.zIndex = "9999";

      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    });
  });
});

// gamePage Scroll
pcBtn.addEventListener('click', () => {
  pcBtn.classList.add('active');
  mobileBtn.classList.remove('active');
  pcGame.classList.add('active');
  mobileGame.classList.remove('active');

  if (!pcGame.src) {
    pcGame.src = "https://rei3sukisugikani.github.io/setarei_5th_typing/";
  }

  setTimeout(() => {
    window.scrollBy(0, 100);
  }, 200);
});

mobileBtn.addEventListener('click', () => {
  mobileBtn.classList.add('active');
  pcBtn.classList.remove('active');
  mobileGame.classList.add('active');
  pcGame.classList.remove('active');

  if (!mobileGame.src) {
    mobileGame.src = "https://rei3sukisugikani.github.io/setarei-5th-typing-mobile/";
  }

  setTimeout(() => {
    window.scrollBy(0, 180);
  }, 200);
});
