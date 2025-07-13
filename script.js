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

// accordion-button
const buttons = document.querySelectorAll(".accordion-button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
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

// emojiOnly
document.addEventListener("DOMContentLoaded", function () {
  const senders = document.querySelectorAll(".envelope .sender");

  senders.forEach(sender => {
    const text = sender.textContent.trim();

    const isEmojiOnly = /^[\p{Emoji}\p{Symbol}\p{Punctuation}]{1,2}$/u.test(text);

    if (isEmojiOnly) {
      sender.classList.add("emoji-only");
    }
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
document.addEventListener("DOMContentLoaded", () => {
  const pcBtn = document.getElementById("pcBtn");
  const mobileBtn = document.getElementById("mobileBtn");
  const pcGame = document.getElementById("pcGame");
  const mobileGame = document.getElementById("mobileGame");

  if (pcBtn && mobileBtn && pcGame && mobileGame) {
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
  }
});


// ✅ script.js（完成版・リセットボタン付き）

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const voiceList = document.getElementById("voiceList");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resetButton = document.getElementById("resetFilter");
  const yearFilterBtn = document.getElementById("yearFilterBtn");
  const yearDropdown = document.getElementById("yearDropdown");

  let currentCategory = "all";
  let currentKeyword = "";
  let currentYear = null;

  function createVoiceEntry(item) {
    const entry = document.createElement("div");
    entry.className = "voice-entry";
    entry.style.width = "100%";
    entry.style.boxSizing = "border-box";
    entry.style.color = "#333";

    const header = document.createElement("div");
    header.className = "voice-header";
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "space-between";

    // タイトルリンク
    const titleLink = document.createElement("a");
    titleLink.href = item.url;
    titleLink.target = "_blank";
    titleLink.style.textDecoration = "none";
    titleLink.style.color = "inherit";
    titleLink.style.flex = "1";
    titleLink.style.overflow = "hidden";
    titleLink.style.textOverflow = "ellipsis";
    titleLink.style.whiteSpace = "nowrap";
    titleLink.textContent = item.title || '(タイトルなし)';

    // 展開ボタン
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = "v";

    header.appendChild(titleLink);
    header.appendChild(caret);

    const detail = document.createElement("div");
    detail.className = "voice-detail";
    detail.innerHTML = `<hr><div><strong>${item.date}</strong>：<strong>${item.title || '(タイトルなし)'}</strong></div><div>${item.text}</div>`;
    detail.style.display = "none";

    // 折りたたみ処理
    caret.style.cursor = "pointer";
    caret.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = detail.style.display === "block";
      detail.style.display = isOpen ? "none" : "block";
      caret.textContent = isOpen ? "v" : "^";
    });

    entry.appendChild(header);
    entry.appendChild(detail);
    return entry;
  }

  function renderList(data) {
    voiceList.innerHTML = "";
    data.forEach(item => {
      voiceList.appendChild(createVoiceEntry(item));
    });
  }

  function filterAndSearch() {
    let filtered = voiceData;

    if (currentCategory !== "all") {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    if (currentYear) {
      filtered = filtered.filter(item => item.date.startsWith(currentYear));
    }

    if (currentKeyword.trim()) {
      const keyword = currentKeyword.toLowerCase();
      filtered = filtered.filter(item =>
        (item.title || "").toLowerCase().includes(keyword) ||
        (item.text || "").toLowerCase().includes(keyword) ||
        (item.kana || "").toLowerCase().includes(keyword)
      );
    }

    renderList(filtered);
  }

  // 🔽 年代フィルタードロップダウン表示位置調整
  yearFilterBtn.addEventListener("click", () => {
    const rect = yearFilterBtn.getBoundingClientRect();
    yearDropdown.style.position = "absolute";
    yearDropdown.style.top = `${rect.bottom + window.scrollY}px`;
    yearDropdown.style.left = `${rect.left + window.scrollX}px`;
    yearDropdown.classList.toggle("hidden");
  });

  // 年代選択
  yearDropdown.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      currentYear = btn.dataset.year;

      // アクティブ状態切り替え
      yearDropdown.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      yearFilterBtn.textContent = `${currentYear} ▼`;

      yearDropdown.classList.add("hidden");
      filterAndSearch();
    });
  });

  // カテゴリボタン
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      filterAndSearch();
    });
  });

  // 検索バー
  searchInput.addEventListener("input", e => {
    currentKeyword = e.target.value;
    filterAndSearch();
  });

  // ✅ リセットボタン
  resetButton.addEventListener("click", () => {
    // カテゴリをリセット
    currentCategory = "all";
    filterButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector('.filter-btn[data-category="all"]').classList.add("active");

    // 年代をリセット
    currentYear = null;
    yearDropdown.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));

    // 検索バーもリセット
    currentKeyword = "";
    searchInput.value = "";

    filterAndSearch();
  });

  // 初期表示
  renderList(voiceData);
});
