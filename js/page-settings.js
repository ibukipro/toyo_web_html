
const pageSettings = {
    "01": {
        chapters: {
            "01": {
                totalPages: 30
            },
            "02": {
                totalPages: 25
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const pageContent = document.querySelector(".page-content");

    if (!pageContent) return;

    const textNumber = pageContent.dataset.textNumber;
    const chapterNumber = pageContent.dataset.chapterNumber;
    const pageNumber = Number(pageContent.dataset.pageNumber);

    const textSettings = pageSettings[textNumber];
    const chapterSettings = textSettings?.chapters?.[chapterNumber];

    const chapterTitleElement = pageContent.querySelector(".chapter-title");

    if (!chapterTitleElement) return;

    if (!chapterSettings || !Number.isFinite(pageNumber) || pageNumber < 1) {
        chapterTitleElement.textContent += "　（ページ情報未設定）";
        return;
    }

    const totalPages = Number(chapterSettings.totalPages);

    if (!Number.isFinite(totalPages) || totalPages < 1) {
        chapterTitleElement.textContent += "　（総ページ数未設定）";
        return;
    }

    const pageLabel = document.createElement("span");
    pageLabel.className = "chapter-page-position";
    pageLabel.textContent = `　${pageNumber} / ${totalPages} ページ`;

    chapterTitleElement.appendChild(pageLabel);

        // テキスト全体でのページ番号を計算
    const chapters = textSettings?.chapters;

    if (chapters && Number.isFinite(pageNumber) && pageNumber >= 1) {
        const previousPages = Object.entries(chapters)
            .filter(([number]) => number < chapterNumber)
            .reduce((sum, [, settings]) => sum + Number(settings.totalPages || 0), 0);

        const totalTextPages = Object.values(chapters)
            .reduce((sum, settings) => sum + Number(settings.totalPages || 0), 0);

        const textPageNumber = previousPages + pageNumber;

        pageContent.dataset.textPageNumber = textPageNumber;
        pageContent.dataset.totalTextPages = totalTextPages;
        const textPagePosition = document.getElementById("text-page-position");

if (textPagePosition) {
    textPagePosition.textContent =
        `テキスト全体：${textPageNumber} / ${totalTextPages} ページ`;
}
    
    
    }


    // ヘッダーにも教材の章クラスを反映
    const siteHeader = document.querySelector(".site-header");

    if (siteHeader) {
        siteHeader.classList.add(`chapter-${textNumber}-${chapterNumber}`);
    }

});
