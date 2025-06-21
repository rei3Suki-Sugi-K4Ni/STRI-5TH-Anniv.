// ページが読み込まれた後に雨エフェクトを追加
document.addEventListener("DOMContentLoaded", function () {
  // game.html だけは雨を除外する
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
// 雷フラッシュ用のアニメーションエフェクト
function createLightningFlash() {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.top = 0;
  flash.style.left = 0;
  flash.style.width = "100%";
  flash.style.height = "100%";
  flash.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // 透明度調整可
  flash.style.zIndex = 99999;
  flash.style.pointerEvents = "none";
  flash.style.animation = "flash 0.2s ease-in-out";

  document.body.appendChild(flash);
  setTimeout(() => document.body.removeChild(flash), 200);
}

// ランダムな間隔で雷を発生させる
function startThunderstorm() {
  setInterval(() => {
    if (Math.random() < 0.15) { // ← 約25％の確率で雷が発生
      createLightningFlash();
    }
  }, 2000); // 2秒ごとにチェック
}

// ページ読み込み後に開始（例：トップページでテスト）
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("index.html")) {
    startThunderstorm();
  }
});

// 手紙のポップアップ表示処理
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

      // 手紙の外側をクリックで閉じる
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
