const { signInWithEmailAndPassword } = require("../config/config");

async function emailLoginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { emailLoginUser };
