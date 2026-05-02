# 🌐 Sahaay — AI-Powered Crisis Response Platform
<img width="1919" height="1089" alt="image" src="https://github.com/user-attachments/assets/68c39891-b652-4190-94c0-74b20b00fe26" />


## 📌 Introduction
Sahaay is an AI-driven platform designed to bridge the gap between people in need, NGOs, and volunteers. It solves the problem of delayed and inefficient crisis response caused by manual processing, language barriers, and scattered communication systems.

With Sahaay, unstructured inputs like handwritten forms, regional languages, and voice notes are instantly processed using AI to extract key information such as urgency, location, and specific needs. NGO coordinators can verify these requests in real-time, and the system intelligently matches them with the most suitable volunteers.

Our mission is to **transform slow, fragmented workflows into fast, precise, and impactful action.**

---

## 🚀 Features
- 🤖 **AI-Powered Processing**  
  Converts handwritten, multilingual, and audio inputs into structured data

- 🌍 **Multilingual Support**  
  Supports Hindi, Punjabi, Hinglish and more

- 📊 **Coordinator Dashboard**  
  Real-time request tracking with one-click verification

- 🎯 **Smart Matching Engine**  
  Matches volunteers based on skills, location, and availability

- ⚡ **Fast Processing**  
  Reduces response time from days to seconds

- 👥 **Simple Onboarding**  
  Easy registration for NGOs and volunteers

---
## 🌍 Live Demo
https://ngo-helper-c784a.web.app/

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aaliya007/volunteer-app.git
cd volunteer-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment variables
```bash
cat <<EOF > .env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
EOF
```

### 4. Run development server
```bash
npm run dev
```

### 5. Open in browser
```bash
http://localhost:5173
```
## 📂 Project Structure

```bash
VOLUNTEER-APP/
│── .firebase/                     # Firebase hosting cache
│   │── hosting.ZGlzc.cache
│   │── hosting.ZGlzdA.cache
│
│── dis/                           
│   │── index.html
│
│── node_modules/                  # Installed dependencies
│
│── public/                        # Static public assets
│   │── favicon.svg
│   │── icons.svg
│   │── sahaay.png
│
│── src/                           # Main application source
│   │── assets/                    # Images & static files
│   │   │── hero.png
│   │   │── logo.png
│   │   │── react.svg
│   │   │── vite.svg
│   │
│   │── components/               
│   │   │── NeedExtractor.jsx
│   │
│   │── services/                  # Firebaselogic
│   │   │── extractor.js
│   │── App.css                    # App styles
│   │── App.jsx                    # Root component
│   │── firebase.js                # Firebase configuration
│   │── index.css                  # Global styles
│   │── LandingPage.jsx            # Landing page
│   │── main.jsx                   # Entry point
│   │── Ngo.jsx                    # NGO dashboard/page
│   │── RegisterNgoPage.jsx        # NGO registration
│   │── RegisterVolunteerPage.jsx  # Volunteer registration
│   │── SubmitNeedPage.jsx         # Submit request page
│   │── Volunteer.jsx              # Volunteer dashboard
│
│── .firebaserc                    # Firebase project config
│── .gitignore                     # Git ignored files
│── eslint.config.js               # ESLint configuration
│── firebase.json                  # Firebase hosting config
│── index.html                     # Root HTML file
│── LICENSE                        # License file
│── package.json                   # Project metadata & scripts
│── package-lock.json              # Dependency lock file
│── postcss.config.js              # PostCSS config
│── tailwind.config.js             # Tailwind CSS config
│── vite.config.js                 # Vite configuration
│── README.md                      # Documentation

```
## 🔮 Future Improvements

- 📱 Mobile application for wider accessibility  
- 🧠 More advanced AI models for deeper context understanding  
- 📍 Real-time tracking of request fulfillment  
- 🔔 Notification system for volunteers and NGOs  
- 🌐 Support for more regional and international languages  
- 📊 Analytics dashboard for impact tracking  
