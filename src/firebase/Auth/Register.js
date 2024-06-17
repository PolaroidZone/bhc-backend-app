const { createUserWithEmailAndPassword } = require("../config/config");

async function emailRegisterUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
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
