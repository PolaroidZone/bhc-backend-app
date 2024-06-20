const express = require("express");
const router = express.Router();
const { getUserData } = require("../firebase/database/userData");
const { auth, db } = require("../firebase/config/config");

function isUser(req, res, next) {
  if (!auth.currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

//get account
router.get("/", isUser, async (req, res) => {
  const uid = auth.currentUser.uid;
  const user = await getUserData(uid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const dbUser = await getUserData(uid);

  if (!dbUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ dbUser });
});

module.exports = router;
