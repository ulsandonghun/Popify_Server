const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
    region:'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY,

});

const s3 = new AWS.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp','.PNG'];

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'nodeimage',
        key: (req, file, callback) => {
            const uploadDirectory = req.query.directory ?? '';
            const extension = path.extname(file.originalname);
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error('wrong extension'));
            }
            callback(null, `${uploadDirectory}/${Date.now()}.${file.originalname.split('.').pop()}`);
        },
        acl: 'public-read-write',
        contentType: (req, file, callback) => {
            // content type 불러오기.
            const contentType = getContentType(file.originalname);
            callback(null, contentType);
        },
    }),
});

// 파일에 따라 메타 데이터 변경(이렇게 변경안하면 url 클릭시 다운로드 되버림.)
function getContentType(filename) {
    const extension = path.extname(filename);
    switch (extension) {
        case '.png':
        case '.PNG':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.bmp':
            return 'image/bmp';
        default:
            return 'application/octet-stream'; // 기본 content type
    }
}

module.exports = imageUploader;
