const express = require('express');
const router = express.Router();
const Popup = require('../models/Popup');

// 팝업스토어 전체 목록 조회 API
router.get('/', async (req, res) => {
    try {
        const popups = await Popup.find()
           .populate('goods')
            .populate('reviews');
            // .populate('map');

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
            .populate('reviews');
            // .populate('map');

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

// 샘플 데이터 생성 API
router.post('/create-sample-popup', async (req, res) => {
  try {
      const samplePopupData = [{
          corporation: "빵빵이의 생일파티",
          term: "2023-08-03 ~ 2023-08-05",
          location: "장소1",
          reservation: "사전예약 여부1",
          free: true,
          business_hours: "9:00 ~ 18:00",
          tags: ["태그1", "태그2"],
          popup_imgs: ["팝업1 이미지 URL1", "팝업1 이미지 URL2"],
          contents: "팝업스토어 내용1",
          goods: ["64d1c8e15ae634f300d7f289"], // Goods ObjectId로 수정
          reviews: ["64d1cb565ae634f300d7f293"], // Review ObjectId로 수정
          latitude: 37.123456, // 위도
          longitude: 127.789012, // 경도
          placeurl: "장소 URL",
      },{
        corporation: "여름 바베큐 페스티벌",
        term: "2023-07-15 ~ 2023-07-20",
        location: "공원1",
        reservation: "사전예약 여부2",
        free: false,
        business_hours: "12:00 ~ 22:00",
        tags: ["이벤트", "페스티벌"],
        popup_imgs: ["페스티벌 이미지 URL1", "페스티벌 이미지 URL2"],
        contents: "시원한 여름을 맞이하는 바베큐 페스티벌",
        goods: ["64d1c8e15ae634f300d7f28a", "64d1c8e15ae634f300d7f28b"],
        reviews: ["64d1cb565ae634f300d7f294"],
        latitude: 36.987654,
        longitude: 128.567890,
        placeurl: "공원 URL",
      },
      // 추가 샘플 데이터들...
      {
        corporation: "가을 나들이 할인 행사",
        term: "2023-10-01 ~ 2023-10-15",
        location: "산1",
        reservation: "사전예약 여부3",
        free: true,
        business_hours: "10:00 ~ 17:00",
        tags: ["할인", "나들이"],
        popup_imgs: ["나들이 이미지 URL1", "나들이 이미지 URL2"],
        contents: "가을의 아름다운 풍경을 즐기는 나들이 할인 행사",
        goods: ["64d1c8e15ae634f300d7f28c"],
        reviews: ["64d1cb565ae634f300d7f295"],
        latitude: 35.789012,
        longitude: 129.345678,
        placeurl: "산 URL",
      },


    ];

      const createdPopup = await Popup.create(samplePopupData);
      res.status(201).json({ message: "Sample Popup Created", popup: createdPopup });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});


// 샘플 데이터 생성 API
router.post('/create-one-sample', async (req, res) => {
  try {
      const samplePopupData = [{
          corporation: "빵빵이의 뿡뿡이",
          term: "2023-08-03 ~ 2023-08-05",
          location: "장소1",
          reservation: "사전예약 여부1",
          free: true,
          business_hours: "9:00 ~ 18:00",
          tags: ["태그1", "태그2"],
          popup_imgs: ["팝업1 이미지 URL1", "팝업1 이미지 URL2"],
          contents: "팝업스토어 내용1",
          goods: ["64d1c8e15ae634f300d7f289"], // Goods ObjectId로 수정
          reviews: ["64d1cb565ae634f300d7f293"], // Review ObjectId로 수정
          latitude: 37.123456, // 위도
          longitude: 127.789012, // 경도
          placeurl: "장소 URL",
      }
    ];

      const createdPopup = await Popup.create(samplePopupData);
      res.status(201).json({ message: "Sample Popup Created", popup: createdPopup });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/latest', async (req, res) => {
  try {
      const popups = await Popup.find()
          .populate('goods')
          .populate('reviews')
          .sort({ createdAt: -1 });

      res.status(200).json(popups);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

// 팝업스토어 제목으로 검색하는 API
//제목을 검색하여 최신순으로 반환합니다.
router.get('/search', async (req, res) => {
  const searchCorporation = req.query.corporation;

  try {
    const popups = await Popup.find({ corporation: { $regex: searchCorporation, $options: 'i' } })
      .populate('goods')
      .populate('reviews')
      .sort({ createdAt: -1 });

    res.status(200).json(popups);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 팝업스토어 해시태그로 검색하는 API
router.get('/search', async (req, res) => {
  const searchTag = req.query.tag; // req.query를 사용하여 URL 파라미터 가져오기
  console.log(searchTag);

  try {
    const popups = await Popup.find({ tags: { $in: [searchTag] } })
      .populate('goods')
      .populate('reviews')
      .sort({ createdAt: -1 });

    res.status(200).json(popups);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 팝업스토어 페이징 조회 API
router.get('/paging', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
      const totalCount = await Popup.countDocuments();
      console.log(totalCount);

      const totalPages = Math.ceil(totalCount / pageSize);
      console.log(totalPages);

      const popups = await Popup.find()
          .populate('goods')
          .populate('reviews')
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize);

      res.status(200).json({
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalCount,
          popups: popups
      });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
