const express = require('express');
const router = express.Router(); 
const { default: imageUploader } = require("../utils/ImageUploader");


router.post('/test/image',imageUploader.single('image'),(req,res) =>{

    res.send('사진파일 1개 전송완료');
})

module.exports =router;