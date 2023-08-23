const express = require('express');
const router = express.Router();
const Popup = require('../models/Popup');

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
// 팝업스토어의 굿즈 목록을 조회하는 API 엔드포인트
router.get('/popups/:popupId', async (req, res, next) => {
    const popupId = req.params.popupId;
  
    try {
      // 팝업스토어 ID로 해당 팝업 정보 조회
      const popup = await Popup.findById(popupId);
  
      if (!popup) {
        return res.status(404).json({ message: '팝업스토어를 찾을 수 없습니다.' });
      }
      const goods = await Goods.find({ popup: popupId });
  
      res.status(200).json(goods);
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });
    }
  });

module.exports = router;
