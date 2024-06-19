const express = require("express");
const router = express.Router();
const { getUserData } = require("../firebase/database/userData");

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
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).json({ user });
});

module.exports = router;
