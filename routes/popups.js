const express = require('express');
const router = express.Router();
const Popup = require('../models/Popup');

// 팝업스토어 전체 목록 조회 API
router.get('/', async (req, res) => {
    try {
        const popups = await Popup.find()
           .populate('goods')
            .populate('reviews')
            .populate('map');

        res.status(200).json(popups);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
