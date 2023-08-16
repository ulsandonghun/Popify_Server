const express = require('express');
const router = express.Router();



// 굿즈 목록을 조회하는 API 엔드포인트
router.get('/', (req, res) => {
  res.json(goods);
});
