document.getElementById("start-btn").addEventListener("click", () => {
    let linksText = document.getElementById("links").value.trim();

    if (!linksText) {
        alert("Please enter some links.");
        return;
    }

    let linksArray = linksText
        .split("\n")
        .map(x => x.trim())
        .filter(x => x !== "");

    if (linksArray.length < 3) {
        alert("Please enter at least 3 LinkedIn URLs.");
        return;
    }

    chrome.runtime.sendMessage({
        action: "start",
        links: linksArray
    });

    alert("Scraping started…");
    window.close(); // prevents popup freeze
});
