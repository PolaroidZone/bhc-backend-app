const { default: firebase } = require("firebase/compat/app");
const { db } = require("../config/config");

async function storeUserData(uid, user) {
  try {
    await db.collection("users").doc(uid).set(user);
    return true;
  } catch (error) {
    console.log("Error storing user data", error.message);
    throw error;
  }
}

async function getUserData(uid) {
  try {
    const user = await db.collection("users").doc(uid).get();
    return user.data();
  } catch (error) {
    console.log("Error getting user data", error.message);
    throw error;
  }
}

module.exports = {
  storeUserData,
  getUserData,
};
