import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

// 🔁 Sync Play
export const syncPlay = async () => {
  const roomCode = sessionStorage.getItem('roomCode');
  if (!roomCode) return;
  try {
    await updateDoc(doc(db, 'room', roomCode), {
      playerState: 1,
    });
  } catch (err) {
    console.error("Failed to sync play:", err);
  }
};

// ⏸️ Sync Pause
export const syncPause = async () => {
  const roomCode = sessionStorage.getItem('roomCode');
  if (!roomCode) return;
  try {
    await updateDoc(doc(db, 'room', roomCode), {
      playerState: 2,
    });
  } catch (err) {
    console.error("Failed to sync pause:", err);
  }
};

// ⏩ Sync Seek
export const syncSeek = async (newTime) => {
  const roomCode = sessionStorage.getItem('roomCode');
  if (!roomCode) return;
  try {
    await updateDoc(doc(db, 'room', roomCode), {
      seekTime: newTime
    });
  } catch (err) {
    console.error("Failed to sync seek:", err);
  }
};