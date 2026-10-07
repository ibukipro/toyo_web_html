function toggleTopic(id) {
    const target = document.getElementById(id);

    if (target.style.display === "block") {
        target.style.display = "none";
    } else {
        target.style.display = "block";
    }
}