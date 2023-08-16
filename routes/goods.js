const express = require('express');
const router = express.Router();
const Goods = require('../models/Goods'); 

// 굿즈 목록을 조회하는 API 엔드포인트
router.get('/', async (req, res, next) => {
    try {
        const goods = await Goods.find(); 
        res.status(200).json(goods);
    } catch (error) {
        res.status(500).json({ error: 'error' });
    }
});

module.exports = router;