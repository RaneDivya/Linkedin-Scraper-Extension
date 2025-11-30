console.log("CONTENT SCRIPT LOADED");

// Safe selector helper
function getText(selector) {
    const el = document.querySelector(selector);
    return el ? el.innerText.trim() : "";
}

function scrapeProfile() {
    console.log("Scraping…");

    const data = {
        name: getText(".pv-text-details__left-panel h1"),
        about: getText(".pv-shared-text-with-see-more span"),
        location: getText(".pv-text-details__left-panel span.text-body-small"),
        followerCount: "",
        connectionCount: "",
        url: window.location.href
    };

    // followers + connections
    const items = document.querySelectorAll(".pv-top-card--list-bullet li");
    if (items.length >= 2) {
        data.followerCount = items[0].innerText.trim();
        data.connectionCount = items[1].innerText.trim();
    }

    console.log("SCRAPED DATA:", data);

    // Send to backend
    fetch("http://localhost:5000/save-profile", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(msg => {
        console.log("Saved to DB:", msg);

        chrome.runtime.sendMessage({
            action: "scraped",
            data
        });
    })
    .catch(err => {
        console.error("❌ Fetch error:", err);
        chrome.runtime.sendMessage({ action: "scraped" });
    });
}

// Let LinkedIn load
setTimeout(scrapeProfile, 7000);
