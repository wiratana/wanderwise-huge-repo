# 🌍 WanderWise Project

WanderWise is a multi-component project consisting of backend APIs, mobile app, scrapers, and machine learning modules.

---

## 📁 Structure
.
├── photo/ # Images / documentation assets
└── project/
├── capstone-city-scrapper
├── wander-wise-cc-api
├── wander-wise-rest-api-cc-2
├── wanderwise-android
├── wanderwise-antara-news-scraper
├── wanderwise-detik-news-scraper
├── wanderwise-news-autolable
├── wanderwise-cloud-function
├── wanderwise-machine-learning
└── wanderwise-scraper-manager


---

## 🧩 Components

### 📊 Scraper
- `capstone-city-scrapper` → scrape city data
- `wanderwise-antara-news-scraper` → scrape news (Antara)
- `wanderwise-detik-news-scraper` → scrape news (Detik)

---

### 🧠 Machine Learning
- `wanderwise-machine-learning`
  - text classification
  - text summarization
  - dataset & notebooks

---

### 🔄 Data Processing
- `wanderwise-news-autolable` → auto labeling
- `wanderwise-scraper-manager` → manage scraping, classification, NER, summarization

---

### 🌐 Backend API
- `wander-wise-cc-api`
  - Node.js API
  - features: auth, cities, jobs, posts, products

- `wander-wise-rest-api-cc-2`
  - alternative API
  - features: auth, cities, destinations, posts, users

---

### ☁️ Cloud
- `wanderwise-cloud-function` → cloud functions

---

### 📱 Mobile App
- `wanderwise-android`
  - Android app (Kotlin)
  - features:
    - city exploration
    - posts
    - notifications
    - emergency info
    - favorites

---

## 📸 Assets
- `photo/` → images for documentation or UI

---

## 📌 Notes
- Project is modular (multi-service)
- Each folder is an independent component
- Some services may be alternative implementations
