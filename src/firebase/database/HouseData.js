const {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  where,
  query,
  getDocs,
  getDoc,
  limit,
} = require("firebase/firestore");
const { db } = require("../config/config");

async function storeHouseData(house) {}

async function getHousetype(house) {}

async function getHouses() {
  try {
    const houses = [];
    const querySnapshot = await getDocs(collection(db, "house"));
    querySnapshot.forEach((doc) => {
      houses.push(doc.data());
    });
    return houses;
  } catch (error) {
    console.error("Error getting documents: ", error);
    res
      .status(500)
      .json({ message: "Error getting houses", error: error.message });
  }
}

async function getHouseById(id) {
  try {
    const docRef = doc(db, "house", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { message: "House not found" };
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return { message: "Error getting house", error: error.message };
  }
}



module.exports = {
  storeHouseData,
  getHouses,
  getHousetype,
  getHouseById,
};
