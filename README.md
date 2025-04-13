
# KASSETTE – Collaborative Music Sync Application

KASSETTE is a real-time, collaborative music synchronization web application that enables users to listen to YouTube music videos together, no matter where they are. It provides synchronized playback, room-based control, and real-time interaction for a shared music listening experience.

---

## Features

- Real-time synchronized playback of YouTube videos across all connected users.
- Room-based functionality allowing users to create or join rooms with unique codes.
- Host-controlled playback: only the room host can manage play, pause, seek, and skip actions.
- Synchronized seek bar that updates in real time across all clients.
- Displays current track information including title, artist, and playback time.
- Skip and seek controls to navigate through the video timeline.
- User presence tracking with real-time room member lists and host identification.
- Playback attribution to display which user triggered the last playback action.
- Responsive and modern user interface for optimal experience on various devices.
- Persistent user identity using cookies to remember names across sessions.

---

## Technology Stack

**Frontend**: React.js, Tailwind CSS, React Icons, Marquee Text  
**Backend**: Firebase Realtime Database, Firestore  
**Media Integration**: YouTube IFrame Player API  
**Authentication & State**: React Context API, Cookies (js-cookie)  
**Hosting**: Compatible with Firebase Hosting, Vercel, or Netlify

---

## Screenshots

Homepage:
- ![Homepage Screenshot 1](https://github.com/user-attachments/assets/575f6509-e925-4f6f-9198-718e95defa08)
- ![Homepage Screenshot 2](https://github.com/user-attachments/assets/4f2fab2d-5a82-4387-b9e8-6715143df987)
- ![Homepage Screenshot 3](https://github.com/user-attachments/assets/c14702a6-c6f8-403f-b07e-6f027839ea9f)
- ![Homepage Screenshot 4](https://github.com/user-attachments/assets/70a5a3cc-3f1f-401d-b764-5f15f5ac27f6)
- ![Homepage Screenshot 5](https://github.com/user-attachments/assets/576cc746-7eb0-437a-8919-edfbed98fa26)

Search Page:
- ![Search Screenshot](https://github.com/user-attachments/assets/920c193c-e33b-44c7-b053-6bd2ab740d29)

Chat:
- ![Chat Screenshot](https://github.com/user-attachments/assets/1195bc37-5c99-421e-9de3-6b11184b3be8)

Profile:
- ![Profile Screenshot](https://github.com/user-attachments/assets/e8c669ec-017c-4333-af55-722c32542795)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kassette-music-sync.git
cd kassette-music-sync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

- Create a project in the Firebase console.
- Enable Firestore Database.
- Update the Firebase configuration in `firebase-config.js` as follows:

```javascript
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

## Project Structure

```
src/
│
├── Components/          # Reusable components such as Sidebar and Player
├── Context/             # Application-wide React Context for state management
├── Functions/           # Utility functions for playback sync, formatting, etc.
├── pages/               # Main pages like Homepage, Index, Search, Chat
├── assets/              # Static assets and icons
├── firebase-config.js   # Firebase integration file
└── App.js / main.jsx    # Application entry point
```

---

## Future Enhancements

- Real-time in-room chat functionality.
- Full mobile responsiveness and optimization.
- Display profile images for all room members.
- Song voting system and themed playlists.
- Support for syncing locally uploaded audio files.
- Secure user authentication using Firebase Auth.
- Playlist queue persistence linked to user accounts.

---

## Contributing

Contributions are welcome. Please submit pull requests for improvements or bug fixes. For major changes, open an issue first to discuss your proposed solution. Follow clean code practices and conventional commit messages.

---

## License

This project is licensed under the MIT License.
```

