const express = require('express');
const router = express.Router();

const Goods = require('../models/Goods'); 

/* 굿즈 전체 목록 조회 */
router.get('/', async (req, res) => {
    try {
        const goods = await Goods.find(); 
        res.status(200).json(goods);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
