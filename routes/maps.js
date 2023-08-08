const express = require('express');
const router = express.Router();
const Map = require('../models/Map');

router.get('/', async (req, res, next) => {
    try {
      const goods = await Map.find(); // 또는 필요한 데이터 조회 작업
      res.json(goods);
    } catch (error) {
      next(error);
    }
  });
  
 
  module.exports = router;