const express = require('express');
const router = express.Router();
const imageUploader = require("../utils/ImageUploader");



router.post('/test/image', imageUploader.single('image'), (req, res) => {
    // 이미지 업로드 후 URL에 접근하여 클라이언트로 응답
    const imageUrl = req.file.location;
    res.json({ imageUrl: imageUrl });
});

module.exports = router;