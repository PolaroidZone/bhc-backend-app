const express = require("express");

const router = express.Router();
const { db } = require("../firebase/config/config");
const { collection, addDoc } = require("firebase/firestore");

router.get("/getHouses", async (req, res) => {
 
});

router.get("/getHouse/:id", async (req, res) => {
  try {
    const houseId = req.params.id;
    const docRef = doc(db, "house", houseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(404).json({ message: "House not found" });
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    res
      .status(500)
      .json({ message: "Error getting house", error: error.message });
  }
});

router.get("/getHouseByType/:type", async (req, res) => {});

router.get("/getHouseByCategory/:category", async (req, res) => {});

router.get("/getHouseByPriceRange/:min/:max", async (req, res) => {});

router.get("/getHouseByArea/:min/:max", async (req, res) => {});

router.get("/getHouseByBedrooms/:bedrooms", async (req, res) => {});

router.get("/getHouseByFurnished/:furnished", async (req, res) => {});

router.get("/getHouseByFittedKitchen/:fittedKitchen", async (req, res) => {});


//mock data

const houseTypes = [
  {
    houseType: "59",
    category: "LowIncome",
    pricerange: "P385,000.00, P500,796.00 -P501,000.00",
    area: "59m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "No",
    floorfinish: "Vinyl",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "No",
    ensuite: "No",
    bathrooms: 1,
  },
  {
    houseType: "60",
    category: "LowIncome",
    pricerange: "P385,000.00, P500,796.00 -P501,000.00",
    area: "60m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "No",
    floorfinish: "Vinyl",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "No",
    ensuite: "No",
    bathrooms: 1,
  },
  {
    houseType: "61",
    category: "LowIncome",
    pricerange: "P2,100",
    area: "61m²",
    clotsize: "375m²-540m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "No",
    floorfinish: "Vinyl",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "No",
    ensuite: "No",
    bathrooms: 1,
  },
  {
    houseType: "70A",
    category: "MediumIncome",
    pricerange: "P2,500",
    area: "70m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "No",
    floorfinish: "Vinyl",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "No",
    ensuite: "No",
    bathrooms: 1,
  },
  {
    houseType: "67",
    category: "LowIncome",
    pricerange: "P2,500",
    area: "67m²",
    clotsize: "373m² - 787m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "No",
    floorfinish: "Vinyl",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "No",
    ensuite: "No",
    bathrooms: 1,
  },
  {
    houseType: "75",
    category: "MediumIncome",
    pricerange: "P2,500",
    area: "75m²",
    clotsize: "405m² - 1122m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "Yes",
    floorfinish: "Ceramic",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "No",
    ensuite: "No",
    bathrooms: 1,
  },
  {
    houseType: "80",
    category: "MediumIncome",
    pricerange: "P2,800",
    area: "80m²",
    clotsize: "512m² - 988m²",
    bedrooms: 3,
    furnished: "No",
    fittedkitchen: "Yes",
    wardrobes: "Yes",
    garage: "No",
    carport: "Yes",
    floorfinish: "Ceramic",
    servantsquarters: "No",
    screenWall: "No",
    fence: "Yes",
    scullery: "No",
    fireplace: "No",
    diningRoom: "Yes",
    ensuite: "No",
    bathrooms: 1,
  },
];

router.post("/addHouse", async (req, res) => {
  try {
    const promises = houseTypes.map((house) =>
      addDoc(collection(db, "houseType"), house)
    );
    const docRefs = await Promise.all(promises);
    res.status(200).json({
      message: "Houses added successfully",
      ids: docRefs.map((doc) => doc.id),
    });
  } catch (error) {
    console.error("Error adding documents: ", error);
    res
      .status(500)
      .json({ message: "Error adding houses", error: error.message });
  }
});

module.exports = router;
