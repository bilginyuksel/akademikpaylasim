const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async function (req, res) {
  try {
    var response = await db.Clause.create(req.body);
    response = await db.Clause.findOne({
      where:{
        id:response.id
      },
      include:[{
       model:db.Profession,
       as:'profession'
     }]
    });
    res.status(201).json(response);
  } catch (error) {
    res.json(error);
  }
});

router.get("/by-profession/:professionId", async function (req, res) {
  try {
     var resp = await db.Clause.findAll({
       where:{
        professionId:req.params.professionId
       },
       include: [{all: true}]
     });
     res.status(200).json(resp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
     var resp = await db.Clause.findOne({
       where:{
         id:req.params.id
       },
       include:[{
        model:db.Profession,
        as:'profession'
      }]
     });
     console.log(resp);
     res.status(200).json(resp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async function(req,res){
  try {
    var response = await db.Clause.findAll({
      include: [{all: true}]
    })
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.put("/", async function (req, res) {
  try {
    var resp = await db.Clause.update(req.body,{
      where:{
        id:req.body.id
      }
    })
    var profession = await db.Clause.findOne({
      where: req.body.id,
      include:[{
        model:db.Profession,
        as:'profession'
      }]
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
    var resp = await db.Clause.destroy({
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
