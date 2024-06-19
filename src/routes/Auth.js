const express = require("express");
const { auth, signOut } = require("../firebase/config/config");
const { emailLoginUser } = require("../firebase/Auth/Login");
const { emailRegisterUser } = require("../firebase/Auth/Register");
const { storeUserData } = require("../firebase/database/userData");

const router = express.Router();

//Authentiaction middleware
const isUser = (req, res, next) => {
  if (!auth.currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await emailLoginUser(email, password);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const displayName = req.body.displayName;

  if (!email || !password || !displayName) {
    return res
      .status(400)
      .json({ message: "Email, password and fullname are required" });
  }

  const user = await emailRegisterUser(email, password);

  if (!user) {
    return res.status(400).json({ message: "Cannot create user" });
  }

  const userObj = {
    email: user.email,
    displayName,
    uid: user.uid,
    photoUrl: user.photoURL,
    phoneNumber: user.phoneNumber,
    createdAt: user.metadata.creationTime,
  };

  const isStored = await storeUserData(user.uid, userObj);

  if (!isStored) {
    return res.status(400).json({ message: "Cannot store user data" });
  }

  res.status(200).json({ user: userObj });
});

router.get("/logout", isUser, async (req, res) => {
  await signOut(auth);
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
