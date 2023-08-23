const express = require('express');
const router = express.Router();

const Goods = require('../models/Goods'); 
const Popup = require('../models/Popup');

/* 굿즈 전체 목록 조회 */
router.get('/', async (req, res) => {
    try {
        const goods = await Goods.find(); 
        res.status(200).json(goods);
    } catch (error) {
        res.status(500).json({ error });
    }
});

/* 팝업스토어별 굿즈 목록 조회 */
router.get('/popups/:popupId', async (req, res) => {
    try {
      const popupId = req.params.popupId;

      // 팝업스토어 ID로 해당 팝업 정보 조회
      const popup = await Popup.findById(popupId);
  
      if (!popup) {
        return res.status(404).json({ message: '팝업스토어를 찾을 수 없습니다.' });
      }
      const goods = await Goods.find({ popup: popupId });

      res.status(200).json(goods);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

module.exports = router;
