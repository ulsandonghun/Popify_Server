const express = require('express');
const router = express.Router();

const Review =require('../models/Review');
const User = require('../models/User');
const Popup = require('../models/Popup');

const authJWT = require('../middlewares/authJWT');

/* 리뷰 전체 목록 조회 */
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch(error) {
    next(error);
  }
});

/* 내가 쓴 리뷰 조회 */
router.get('/user', authJWT, async (req, res, next) => {
  try {
    const user = await User.findOne({
      user_id: req.user_id,
      is_deleted: false
    });

    if (!user) {
      return res.status(401).json({ message: '자신의 리뷰만 접근 가능한 API' });
    }

    const reviews = await Review.find({ user: user._id });

    if (reviews === null) {
      return res.status(200).json({ message: '리뷰가 없습니다.' });
    }

    res.status(200).json(reviews);

  } catch (error) {
    next(error);
  }
});

// 리뷰 생성
router.post('/:popupId', authJWT, async (req, res, next) => {
  try {
    const { rate, contents, review_img} = req.body;
    const user = await User.findOne({
      user_id: req.user_id, 
      is_deleted: false
    });
   
    if (!user) {
      res.status(401).json({ message: '인증된 사용자만 접근 가능한 API' });
      return;
    }

    if (!await Popup.exists({_id: req.params.popupId})) {
      return res.status(404).json({ error: "없는 팝업스토어입니다."});
    }

    const newReview = await Review.create({
      rate,
      contents,
      review_img,
      user: user._id,
      popup: req.params.popupId
    });

    // 리뷰 생성 후, 해당 팝업의 reviews 배열에 리뷰의 ObjectId를 추가
    const updatedPopup = await Popup.findByIdAndUpdate(
      req.params.popupId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// 리뷰 삭제
router.delete('/:reviewId',authJWT, async (req, res, next) => {
  try {
    const user = await User.findOne({
      user_id: req.user_id,
      is_deleted: false
    });

    if (!user) {
      res.status(401).json({ message: '인증된 사용자만 접근 가능한 API' });
      return;
    }

    const id = req.params.reviewId;  

    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: '삭제할 리뷰를 찾을 수 없습니다.' });
      return;
    }

    // 로그인한 사용자와 리뷰 작성자가 동일한지 확인
    if (!user._id.equals(review.user)) {
      return res.status(403).json({ message: '리뷰 작성자만 삭제할 수 있습니다.' });
    }
    // 팝업스토어의 reviews 배열에서 해당 리뷰 ObjectId 제거
    const updatedPopup = await Popup.findByIdAndUpdate(
      review.popup,
      { $pull: { reviews: review._id } },
      { new: true }
    );

    const deletedReview = await Review.findByIdAndDelete(id);

    if (deletedReview) {
      res.json({ result: '삭제 성공' });
    } else {
      res.status(500).json({ message: '리뷰 삭제 중 오류가 발생했습니다.' });
    }
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});

module.exports = router;
