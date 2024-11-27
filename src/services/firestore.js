import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIsInWatchlist(userId, dataId)) {
        return;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addDocument,
    addToWatchlist,
    checkIsInWatchlist,
    removeFromWatchlist,
  };
};
