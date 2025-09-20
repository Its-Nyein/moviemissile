import { useCallback } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (
    collectionName: string,
    data: Record<string, unknown>,
  ) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const addToWatchlist = async (
    userId: string,
    dataId: string,
    data: Record<string, unknown>,
  ) => {
    try {
      if (await checkIsInWatchlist(userId, dataId)) {
        return;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsInWatchlist = async (userId: string, dataId: string) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString(),
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchlist = async (userId: string, dataId: string) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString()),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getWatchlistData = useCallback(async (userId: string) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist"),
    );

    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addDocument,
    addToWatchlist,
    checkIsInWatchlist,
    removeFromWatchlist,
    getWatchlistData,
  };
};
