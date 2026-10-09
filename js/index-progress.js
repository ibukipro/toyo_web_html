
document.addEventListener("DOMContentLoaded", () => {
    const storageKey = "toyoIndexViewed";

    // 保存済みの閲覧記録を取得
    function getViewedSections() {
        return JSON.parse(localStorage.getItem(storageKey) || "{}");
    }

    // 読んだ節の色を復元
    function restoreViewedSections() {
        const saved = getViewedSections();

        document.querySelectorAll(".chapter-links .section-link").forEach(link => {
            const pageId = link.getAttribute("href");

            if (saved[pageId]) {
                link.classList.add("is-viewed");
            }
        });
    }

    // 節をクリックしたら閲覧済みとして保存
    document.querySelectorAll(".chapter-links .section-link").forEach(link => {
        link.addEventListener("click", () => {
            const saved = getViewedSections();
            const pageId = link.getAttribute("href");

            saved[pageId] = true;

            localStorage.setItem(storageKey, JSON.stringify(saved));
        });
    });

    restoreViewedSections();
});