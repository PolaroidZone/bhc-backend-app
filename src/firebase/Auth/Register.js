const { auth } = require("../config/config");
const { createUserWithEmailAndPassword } = require("firebase/auth");

async function emailRegisterUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { emailRegisterUser };
