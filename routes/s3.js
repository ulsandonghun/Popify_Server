const express = require('express');
const router = express.Router();

const imageUploader = require("../utils/ImageUploader");

/* S3 이미지 하나 등록 */
router.post('/upload/image', imageUploader.single('image'), (req, res) => {
    // 이미지 업로드 후 URL에 접근하여 클라이언트로 응답
    const imageUrl = req.file.location;
    res.json({ imageUrl: imageUrl });
});

/* S3 이미지 여러 개 등록 */
router.post('/upload/images', imageUploader.array('images', 20), (req, res) => {
    // 이미지 업로드 후 URL에 접근하여 클라이언트로 응답
    const imageUrls = req.files.map(file => ({
        filename: file.originalname,
        url: file.location
    }));
    res.json({ images: imageUrls });
});
module.exports = router;
