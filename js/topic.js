
function toggleTopic(id) {
    const target = document.getElementById(id);

    if (!target) {
        console.error("対象が見つかりません:", id);
        return;
    }

    target.classList.toggle("is-open");

    if (target.classList.contains("is-open")) {
        const type = /t\d+$/.test(id) ? "topic" : "more";
        markViewed(id, type);
    }
}

// 閲覧記録を保存する
function markViewed(id, type) {
    const key = "toyoProgress";
    const saved = JSON.parse(localStorage.getItem(key) || "{}");

    saved[id] = {
        type: type,
        viewed: true
    };

    localStorage.setItem(key, JSON.stringify(saved));

    updateViewedStyle(id, type);
    updateProgress();
}

// 閲覧済みのボタンを薄い色にする
function updateViewedStyle(id, type) {
    const selector = type === "topic"
        ? ".topic-button"
        : ".more-button";

    document.querySelectorAll(selector).forEach(button => {
        if (button.getAttribute("onclick") === `toggleTopic('${id}')`) {
            button.classList.add("is-viewed");
        }
    });
}

// 保存済みの閲覧状態を復元する
function restoreViewedStyles() {
    const key = "toyoProgress";
    const saved = JSON.parse(localStorage.getItem(key) || "{}");

    for (const id in saved) {
        if (saved[id].viewed) {
            updateViewedStyle(id, saved[id].type);
        }
    }

    updateProgress();
}

// ページ全体の進捗を計算する
function updateProgress() {

    const key = "toyoProgress";
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    const blocks = document.querySelectorAll(".topic-block");

    let total = 0;
    let completed = 0;

    blocks.forEach(block => {

        // トピックのボタンを確認
        const topicButton = block.querySelector(".topic-button");

        if (!topicButton) return;

        const topicMatch = topicButton.getAttribute("onclick")
            ?.match(/toggleTopic\('([^']+)'\)/);

        if (!topicMatch) return;

        const topicId = topicMatch[1];

        // トピック自体を1項目として数える
        total++;

        if (saved[topicId]?.viewed === true) {
            completed++;
        }

        // 「もっと見る」がある場合だけ追加で数える
        const moreButton = block.querySelector(".more-button");

        if (moreButton) {

            const moreMatch = moreButton.getAttribute("onclick")
                ?.match(/toggleTopic\('([^']+)'\)/);

            if (moreMatch) {

                const moreId = moreMatch[1];

                total++;

                if (saved[moreId]?.viewed === true) {
                    completed++;
                }
            }
        }

    });

    const percent = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    const percentLabel = document.getElementById("progress-percent");
    const progressBar = document.getElementById("progress-bar");
    const summary = document.getElementById("progress-summary");

    if (percentLabel) {
        percentLabel.textContent = `${percent}%`;
    }

    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }

    if (summary) {
        summary.textContent = `確認済み ${completed} / ${total} 項目`;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    restoreViewedStyles();
});