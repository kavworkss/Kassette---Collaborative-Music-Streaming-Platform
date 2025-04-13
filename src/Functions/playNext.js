import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";

const playNext = async (image, title, id, channelName, songs, currentPlaying, name) => {
  if (!Array.isArray(songs) || !currentPlaying || !id || !sessionStorage.getItem('roomCode')) {
    console.warn("Invalid inputs provided to playNext function.");
    return;
  }

  const index = songs.findIndex(data => data.id === currentPlaying.id);

  // If currentPlaying song not found, just push at end as fallback
  const insertIndex = index !== -1 ? index + 1 : songs.length;

  songs.splice(insertIndex, 0, {
    image,
    title,
    id,
    channelName,
    playedBy: name
  });

  try {
    const roomCode = sessionStorage.getItem('roomCode');
    await updateDoc(doc(db, 'room', roomCode), {
      currentSong: [...songs]
    });
  } catch (err) {
    console.error("Failed to update Firestore in playNext:", err);
  }
};

export default playNext;