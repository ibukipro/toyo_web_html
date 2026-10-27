
document.getElementById("site-header").innerHTML = `
<header class="site-header">

    <div class="site-header-inner">
        <div class="site-title">
            和のコーチングセミナー
        </div>

        <button
            class="menu-toggle"
            id="menu-toggle"
            type="button"
            aria-label="メニューを開く"
            aria-expanded="false"
            aria-controls="site-menu"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>

    <div class="menu-overlay" id="menu-overlay"></div>

    <nav class="site-menu" id="site-menu" aria-label="サイトメニュー" inert>
        <div class="site-menu-heading">メニュー</div>

      <a href="#" data-page="index.html">トップページ</a>
      <a href="#" data-page="basic/index.html">基本論</a>
      <a href="#" data-page="advanced/index.html">発展論</a>
      <a href="#" data-page="tools/generator.html">教材ページ作成ツール</a>
      
    </nav>

</header>
`;

const isGitHubPages = location.hostname === "ibukipro.github.io";
const siteBase = isGitHubPages ? "/toyo_web_html/" : "/";

document.querySelectorAll("#site-menu a[data-page]").forEach(link => {
    link.href = siteBase + link.dataset.page;
});

document.getElementById("site-footer").innerHTML = `
<footer class="site-footer">

    <div class="site-footer-inner">
        <div class="site-footer-title">
            和のコーチングセミナー
        </div>

        <div class="site-footer-copy">
            © 2026 和のコーチングセミナー
        </div>
    </div>

</footer>
`;

const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");
const menuOverlay = document.getElementById("menu-overlay");

function closeMenu() {
    siteMenu.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");
    siteMenu.inert = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    document.body.classList.remove("menu-open");
}

function openMenu() {
    siteMenu.classList.add("is-open");
    menuOverlay.classList.add("is-open");
    siteMenu.inert = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "メニューを閉じる");
    document.body.classList.add("menu-open");
}

menuToggle.addEventListener("click", () => {
    if (siteMenu.classList.contains("is-open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

menuOverlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});
