import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";

const shuffleSong = async (image, title, id, channelName, songs, name) => {
  if (!songs || !Array.isArray(songs)) return;

  const roomCode = sessionStorage.getItem('roomCode');
  if (!roomCode) {
    console.error("Room code is missing.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * (songs.length + 1));
  songs.splice(randomIndex, 0, { image, title, id, channelName, playedBy: name });

  await updateDoc(doc(db, 'room', roomCode), {
    currentSong: [...songs],
  }).catch((err) => console.log("Shuffle update failed:", err));
};

export default shuffleSong;