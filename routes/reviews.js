const express = require('express');
const router = express.Router();

const User =require('../models/User');
const Review =require('../models/Review');

const authJWT = require('../middlewares/authJWT');


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
 
// 리뷰 상세 조회
router.get('/:id',authJWT,  async (req, res, next) => {
  
  const user = await User.findOne({
    user_id: req.user_id, 
    is_deleted: false
  });
  res.json({ message: '인증된 사용자만 접근 가능한 API' });

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
router.post('/:id',authJWT, async (req, res, next) => {

  
  
  try {
    const { rate, contents, review_img} = req.body;
    const user = await User.findOne({
      user_id: req.user_id, 
      is_deleted: false
    });
   
    const newReview = await Review.create({
      rate,
      contents,
      review_img,
      user: user._id,
      popup: req.params.id
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// 리뷰 삭제
router.delete('/:id',authJWT, async (req, res, next) => {

  try {
    const user = await User.findOne({
      user_id: req.user_id,
      is_deleted: false
    });

    if (!user) {
      res.status(401).json({ message: '인증된 사용자만 접근 가능한 API' });
      return;
    }

    const id = req.params.id;  

    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: '삭제할 리뷰를 찾을 수 없습니다.' });
      return;
    }

    // 로그인한 사용자와 리뷰 작성자가 동일한지 확인
    if (!user._id.equals(review.user)) {
      return res.status(403).json({ message: ' 리뷰 작성자만 삭제할 수 있습니다.' });
    }

    console.log('Requested ID:', id);
    const deletedReview = await Review.findByIdAndDelete(id);
    console.log('Deleted Review:', deletedReview);

    if (deletedReview) {
      res.json({ result: 'success' });
    } else {
      res.status(500).json({ message: '리뷰 삭제 중 오류가 발생했습니다.' });
    }
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});

module.exports = router;
