const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async function (req, res) {
  try {
    var response = await db.Profession.create(req.body);
    
    res.status(201).json(response);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
     var resp = await db.Profession.findOne({
       where:{
         id:req.params.id
       }
     });
     res.status(200).json(resp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async function (req, res) {
  console.log("rquest captured")
  try {
    var resp = await db.Profession.findAll();
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error });
  }
});

router.put("/", async function (req, res) {
  try {
    var resp = await db.Profession.update(req.body,{
      where:{
        id:req.body.id
      }
    })
    var profession = await db.Profession.findOne({
      where: req.body.id
    })
    res.status(200).json(profession);
    console.log(resp);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
    console.log('update başarısız.');
  }
});

router.delete("/", async function (req, res) {
  try {
    var resp = await db.Profession.destroy({
      where: {
        id: req.body.id,
      }
    });
    res.status(200).json(resp);
    console.log('silme başarılı');
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
    console.log('silme başarısız.');
  }
});

module.exports = router;
