const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../config/config");

async function emailLoginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error;
  }
}

module.exports = { emailLoginUser };
