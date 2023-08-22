const jwt = require('../utils/jwt-util');

const authJWT = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split('Bearer ') [1];    // header에서 access token 가져옴
        const result = jwt.verify(token);   // 토큰 검증
        if (result.ok) {    // 검증 성공 시 req에 값을 세팅하고, 다음 콜백함수로 감
            req.user_id = result.id;
            next();
        } 
        else {    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지 담아서 응답
            throw new Error (
                `${result.message}`    // jwt가 만료되었다면 'jwt expired' 메시지
            );
        }
    }
    else {
        throw new Error("로그인이 필요합니다.");
    }
};

module.exports = authJWT;