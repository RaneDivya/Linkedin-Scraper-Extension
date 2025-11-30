let profileLinks = [];
let currentIndex = 0;

// Receive links from popup
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "start") {
        profileLinks = request.links;
        currentIndex = 0;
        openNextProfile();
    }
});

function openNextProfile() {
    if (currentIndex >= profileLinks.length) {
        console.log("✔ DONE – All profiles opened!");
        return;
    }

    const url = profileLinks[currentIndex];
    console.log("Opening:", url);

    chrome.tabs.create({ url }, (tab) => {
        console.log("Opened tab:", tab.id);
    });
}

// Receive scraped msg from content.js
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "scraped") {
        console.log("Scraped:", request.data);

        // Close the current tab
        if (sender.tab && sender.tab.id) {
            chrome.tabs.remove(sender.tab.id);
        }

        // Move to next profile
        currentIndex++;
        setTimeout(openNextProfile, 2000);
    }
});
