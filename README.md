
# 🎵 Kasette – YouTube Music Sync App

**Kasette** is a real-time collaborative music sync web app that allows users to listen to YouTube music videos together in perfect sync. Whether you're miles apart or just want a virtual listening party, Kasette provides shared rooms, synchronized playback, queue management, and real-time chat for the ultimate group music experience.

---

## ✨ Features

- 🎧 **Real-time Music Sync** – Synchronized playback of YouTube videos across all connected users
- 👥 **Room-based Listening** – Users can create and join private rooms with unique codes
- 🎛️ **Host Controls** – Only the room host can control play, pause, seek, and skip actions
- 🧭 **Seek Bar Sync** – Seamlessly syncs seek actions across all devices in the room
- 🎵 **Current Track Info** – Displays the song title, artist, and playback timestamps
- 🔁 **Skip & Seek** – Skip forward/backward and seek to any point in the track
- 📝 **User Presence** – See who's in the room with name labels and host indicator
- 🧠 **Playback Attribution** – Shows who last triggered a playback event
- ✅ **Smooth UI/UX** – Fully responsive interface with modern design
- 🍪 **Cookie-based Profile Memory** – Remembers user names using browser cookies

---

## 🛠️ Tech Stack

| Category          | Technologies Used                                      |
|------------------|--------------------------------------------------------|
| **Frontend**      | React.js, Tailwind CSS, React Icons, Marquee Text     |
| **Backend**       | Firebase Realtime Database, Firestore                 |
| **Authentication**| Cookies (js-cookie) for user persistence              |
| **Media**         | YouTube IFrame Player API                             |
| **State Mgmt**    | React Context API                                     |
| **Hosting**       | (Deployable on Firebase Hosting, Vercel, or Netlify) |

---

## 📸 Screenshots

```
Homepage-
![image](https://github.com/user-attachments/assets/575f6509-e925-4f6f-9198-718e95defa08)
![image](https://github.com/user-attachments/assets/4f2fab2d-5a82-4387-b9e8-6715143df987)
![image](https://github.com/user-attachments/assets/c14702a6-c6f8-403f-b07e-6f027839ea9f)
![image](https://github.com/user-attachments/assets/70a5a3cc-3f1f-401d-b764-5f15f5ac27f6)
![image](https://github.com/user-attachments/assets/576cc746-7eb0-437a-8919-edfbed98fa26)

Search-
![image](https://github.com/user-attachments/assets/920c193c-e33b-44c7-b053-6bd2ab740d29)

Chat-
![image](https://github.com/user-attachments/assets/1195bc37-5c99-421e-9de3-6b11184b3be8)

Profile-
![image](https://github.com/user-attachments/assets/e8c669ec-017c-4333-af55-722c32542795)

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kasette-music-sync.git
cd kasette-music-sync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

- Create a Firebase project
- Enable Firestore Database and configure the rules
- Copy your Firebase config and paste it into `firebase-config.js`

```js
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 4. Run the development server

```bash
npm start
```

---

## 📦 Project Structure

```
src/
│
├── Components/          # Reusable components (e.g., Sidebar, Player)
├── Context/             # React context for global state
├── Functions/           # Utility functions (e.g., sync, time conversion)
├── pages/               # Main UI views
│   └── Index.js         # Core player view
├── assets/              # Images and visual assets
├── firebase-config.js   # Firebase setup
└── App.js / main.jsx    # App entry point
```

---

## 📈 Future Enhancements

- 💬 Add real-time chat in each room
- 📱 Mobile optimization for improved responsiveness
- 🧑‍🤝‍🧑 Display profile pictures for all room members
- 🗳️ Add room-wide song voting and playlist themes
- 📥 Upload & sync local audio (non-YouTube content)
- 🔐 Add user authentication with Firebase Auth
- 💾 Save and load playlist queues from user profiles

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change. Follow conventional commit messages and clean code standards.

---

## 📃 License

This project is open-source and available under the MIT License.
