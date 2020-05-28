const db = require("../../data/dbConfig");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPlants = await db("plants").where({ user_id: req.user.id });
    if (allPlants.length) {
      res.status(200).json(allPlants);
    } else {
      res.status(404).json({ message: "This user does not have any plants" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message, message: "Cannot fetch plants" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundPlant = await db("plants")
      .where({ id: Number(req.params.id), user_id: req.user.id })
      .first();
    if (foundPlant) {
      res.status(200).json(foundPlant);
    } else {
      res.status(404).json({ message: "No plant by that id" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cannot find this plant", err: err.message });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  const plantsObj = {
    ...post,
    user_id: req.user.id,
  };

  if (isValid(post)) {
    try {
      const [newPlantId] = await db("plants").returning("id").insert(plantsObj);
      if (newPlantId) {
        const newPlant = await db("plants").where({ id: newPlantId });
        if (newPlant) {
          res.status(201).json(newPlant);
        } else {
          res
            .status(400)
            .json({ message: "Could not create new plant, please try again" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Could not create new plant, please try again" });
      }
    } catch (err) {
      res.status(500).json({ message: error.messsage, err: err.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please include nickname, species, and h2ofrequency" });
  }
});

router.put("/:id", async (req, res) => {
  const plantId = Number(req.params.id);
  // const userId = Number(req.user.id);

  const post = req.body;
  const plantsObj = {
    ...post,
    user_id: req.user.id,
  };

  if (isValid(post)) {
    try {
      const [foundPlant] = await db("plants").where({ id: plantId });
      if (!foundPlant) {
        return res.status(404).json({ message: "No plant found with that id" });
      }
      if (Number(foundPlant.id) === plantId) {
        const [updatedPlantId] = await db("plants")
          .where({ id: plantId })
          .returning("id")
          .update(plantsObj);
        if (updatedPlantId) {
          const updatedPlant = await db("plants").where({ id: updatedPlantId });
          if (updatedPlant) {
            res.status(200).json(updatedPlant);
          } else {
            res
              .status(400)
              .json({ message: "Could not update plant, please try again" });
          }
        } else {
          res
            .status(400)
            .json({ message: "Could not update plant, please try again" });
        }
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong, try again", err: err.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please include nickname, species, and h2ofrequency" });
  }
});

router.delete("/:id", async (req, res) => {
  const plantId = Number(req.params.id);
  const userId = Number(req.user.id);
  try {
    const [foundPlant] = await db("plants").where({ id: plantId });
    if (!foundPlant) {
      return res.status(404).json({ message: "No plant found with that id" });
    }
    if (Number(foundPlant.user_id) === userId) {
      const [deletedPlant] = await db("plants")
        .where({ id: plantId })
        .returning("id")
        .del();
      if (deletedPlant) {
        res
          .status(200)
          .json({ message: `Plant deleted with id of ${deletedPlant}` });
      } else {
        res.status(404).json({ message: "plant not found with that ID" });
      }
    } else res.status(404).json({ message: "plant not found with that ID" });
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
});

function isValid(post) {
  return Boolean(post.nickname && post.species && post.h2oFrequency);
}

module.exports = router;
