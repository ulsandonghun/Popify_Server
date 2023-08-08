const express = require('express');
const router = express.Router();
const Review =require('../models/Review');



// 리뷰 목록을 가져오는 API 엔드포인트
router.get('/', async(req, res,next) => {
  try{
    const reviews = await Review.find();
    res.status(200).json(reviews);
  }
catch(error){
  res.status(500).json({error});
}
});
 
// // 리뷰 상세 조회
// router.get('/:id', async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const review = await Review.findById(id);
//     if (review) {
//       res.status(200).json(review);
//     } else {
//       res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const review = await Review.findById(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
    }
  } catch (error) {
    next(error);
  }
});
// 리뷰 생성
router.post('/', async (req, res, next) => {
  const { rate, contents, review_img, user, popup } = req.body;
  try {
    const newReview = await Review.create({
      rate,
      contents,
      review_img,
      user,
      popup
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// 리뷰 삭제
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (deletedReview) {
      res.json({ result: 'success' });
    } else {
      res.status(404).json({ message: '삭제할 리뷰를 찾을 수 없습니다.' });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;