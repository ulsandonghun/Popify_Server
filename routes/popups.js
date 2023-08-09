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
router.get('/search/:id', async (req, res) => {
    const popupId = req.params.id;

    try {
        const popup = await Popup.findById(popupId)
            .populate('goods')
            .populate('reviews')
            .populate('map');

        if (!popup) {
            return res.status(404).json({ error: 'Popup not found' });
        }

        res.status(200).json(popup);
    } catch (error) {
        res.status(500).json({ error: 'Internal syj erver error' });
    }
});
// 리뷰의 갯수순으로 팝업 정보를 정렬하는 API 엔드포인트

// 팝업스토어 리뷰 갯수 순으로 정렬하여 조회하는 API
router.get('/sort/reviewCount', async (req, res) => {
  try {
      const popups = await Popup.find()
          .populate('reviews')
          .lean();

      // 리뷰 갯수로 정렬
      popups.sort((a, b) => b.reviews.length - a.reviews.length);

      res.status(200).json(popups);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
