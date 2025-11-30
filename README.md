# LinkedIn Scraper Extension

A Chrome Extension + Node.js backend application that automatically scrapes LinkedIn profile data and stores it in a SQLite database.

This project was built as part of **Banao Chrome Extension Task 2**.

---

## 🚀 Features

### Chrome Extension  
- Accepts **multiple LinkedIn profile URLs** (minimum 3).  
- Opens each URL **automatically, one by one**.  
- Scrapes the following profile information:
  - Name  
  - About / Bio  
  - Location  
  - Followers count  
  - Connections count  
  - LinkedIn profile URL  
- Sends scraped data to backend API.  

### Backend (Node.js + Express + SQLite)
- REST API endpoint `/save-profile` to save data.  
- Stores each profile in a **SQLite database** with fields:
  - name  
  - about  
  - location  
  - followerCount  
  - connectionCount  
  - url  
  - created_at  
- Endpoint `/profiles` returns all saved profiles.

## 📂 Project Structure
```
├── chrome-extension/
│ ├── manifest.json
│ ├── background.js
│ ├── content.js
│ ├── popup.html
│ ├── popup.js
│ ├── icon.png
│
└── linkedin-backend/
├── server.js
├── package.json
├── db/
└── links.db
```

## 🔧 How to Run the Project

### **1️⃣ Start the backend server**
```bash
cd linkedin-backend
node server.js

The server runs on:
http://localhost:5000
