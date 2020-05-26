const db = require('../../data/dbConfig');
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    db("plants")
    .then(plants => {
        res.status(200).json(plants);
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    })
})

router.get('/:id', (req, res) => {
    db("plants")
    .where({id: req.params.id})
    .first()
    .then(plant => {
        if (plant) {
            res.status(200).json(plant);
        } else {
            res.status(404).json({message: "No plants by that id"});
        }
    })
    .catch(err => {
        res.json(err);
    })
})

router.post('/', (req, res) => {
    const post = req.body;

    if (isValid(post)) {
        db("plants")
        .insert(post, "id")
        .then (id => {
            res.status(201).json({data: id});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: error.messsage });
          });
      } else {
        res
          .status(400)
          .json({ message: "please provide nickname, species, h2oFrequency, and user_id" });
      }
    });

router.put('/:id', (req, res) => {
    const changes = req.body;

    db("plants")
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
        if (count) {
            res.status(200).json({data: count})
        } else {
            res.status(404).json({message: "plant not found by that ID"})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    })
})

router.delete("/:id", (req, res) => {
    db("plants")
      .where({ id: req.params.id })
      .del()
      .then(count => {
        
        if (count) {
          res.status(200).json({ data: count });
        } else {
          res.status(404).json({ message: "plant not found with that ID" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });


function isValid(post) {
    return Boolean(post.nickname && post.species && post.h2oFrequency && post.user_id);
}



module.exports = router;
