const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async function (req, res) {
    try {
      var response = await db.Subclause.create(req.body);
      response = await db.Subclause.findOne({
        where:{
          id:response.id
        },
        include:[{
         model:db.Clause,
         as:'clause'
       }]
      });
      res.status(201).json(response);
    } catch (error) {
      res.json(error);
    }
  });
  

  router.get("/", async function(req,res){
    try {
      var response = await db.Subclause.findAll({
        include: [{all: true}]
      })
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  });


module.exports = router;
