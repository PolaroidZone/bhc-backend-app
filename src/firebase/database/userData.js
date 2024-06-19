const {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  where,
  query,
  getDocs,
  limit,
} = require("firebase/firestore");
const { db } = require("../config/config");

async function storeUserData(uid, user) {
  const colllectionName = "users";
  try {
    const ref = await addDoc(collection(db, colllectionName), user);
    return ref;
  } catch (error) {
    console.error("Error adding user to database:", error);
  }
}

async function getUserData(uid) {
  try {
    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", uid),
      limit(1)
    );

    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.log("Store not found");
      return null;
    } else {
      const userDoc = userSnapshot.docs[0];
      return userDoc.data();
    }
  } catch (error) {
    console.error("Error getting user");
    throw error;
  }
}

module.exports = {
  storeUserData,
  getUserData,
};
