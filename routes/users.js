const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
const jwtUtil = require('../utils/jwt-util');
const redisClient = require('../utils/redis');

const authJWT = require('../middlewares/authJWT');

/* 회원가입 */
router.post('/signup', asyncHandler(async (req, res) => {
  let { user_id, password } = req.body;

  // 필수 입력 확인
  if (!user_id) {
    throw new Error("아이디를 입력하세요.");
  }
  if (!password) {
    throw new Error("비밀번호를 입력하세요.");
  }

  // 비밀번호 형식 제한
  const regex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/);
  if (!regex.test(password)) {
    throw new Error("영문, 숫자, 특수문자를 포함하여 6 ~ 20자로 입력하세요.");
  }

  // 아이디 중복 확인
  if (await User.exists({user_id, is_deleted: false})) {
    throw new Error("이미 사용 중인 아이디입니다.");
  }

  const user = await User.create({
    user_id, 
    password: hashPassword(password),
  });

  res.json({message: "회원가입이 완료되었습니다.", user});
}));

/* 아이디 중복 확인 */
router.get('/id/:user_id/exist', asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  if (await User.exists({user_id, is_deleted: false})) {
    return res.status(409).json({message: "이미 사용 중인 아이디입니다."});
  }

  res.json({message: "사용 가능한 아이디입니다."});
}));

/* 로그인 */
router.post('/login', asyncHandler(async (req, res) => {
  const { user_id, password } = req.body;
  const user = await User.findOne({
    user_id, 
    password: hashPassword(password), 
    is_deleted: false
  });

  // 필수 입력 확인 + 공백 방지
  if (!user_id || !user_id.trim()) {
    throw new Error("아이디를 입력하세요.");
  }
  if (!password || !password.trim()) {
    throw new Error("비밀번호를 입력하세요.");
  }

  // DB에 유저 존재 확인
  if (!user) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  }

  const access_token = jwtUtil.sign(user_id);
  const refresh_token = jwtUtil.refresh();
  
  // 발급한 refresh token을 redis에 key를 user의 아이디로 하여 저장
  redisClient.set(user_id, refresh_token);
  res.json({
    user,
    token: {
      access_token,
      refresh_token,
    },
  });
}));

/* access token 재발급 */
router.get('/refresh', asyncHandler(async (req, res) => {
  const { authorization, refresh } = req.headers;

  // access token과 refresh token 존재하는지
  if (authorization && refresh) {
    const auth_token = authorization.split('Bearer ')[1];
    const refresh_token = refresh;

    // access token 검증 -> expired여야 함
    const auth_result = jwtUtil.verify(auth_token);

    // access token 디코딩하여 user_id 가져옴
    const decoded = jwt.decode(auth_token);
	
    // 디코딩 결과가 없으면 권한이 없음을 응답
    if (decoded === null) {
      throw new Error("권한 없음");
    }
	
    // access token의 decoding된 값에서 유저의 id를 가져와 refresh token 검증
    const refresh_result = await jwtUtil.refreshVerify(refresh_token, decoded.id);

    // 재발급을 위해서는 access token이 만료되어 있어야 함
    if (auth_result.ok === false && auth_result.message === 'jwt expired') {
      // access token이 만료되고, refresh token도 만료된 경우 => 새로 로그인
      if (!refresh_result) {
        throw new Error("모든 토큰이 만료되어 다시 로그인해야 합니다.");
      }

      // access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token 발급
      else {
        const new_access_token = jwtUtil.sign(decoded.id);
        // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환
        res.json({ 
          token: {
            access_token: new_access_token,
            refresh_token,
          },
        });
      }
    } 
    // access token이 만료되지 않은경우 => refresh할 필요가 없음
    else if (auth_result.ok === true) {
      throw new Error("Access token이 아직 만료되지 않았습니다.");
    }
    // auth_result 에러
    else {
      throw new Error("잘못된 Access token입니다.");
    }
  } 
  // access token 또는 refresh token이 헤더에 없는 경우
  else { 
    throw new Error("Access token과 Refresh token이 모두 필요합니다.");
  }
}));

/* 로그아웃 */
router.get('/logout', authJWT, asyncHandler(async (req, res) => {
  await redisClient.exists(req.user_id, async (err, ok) => {   // true: ok(1), false: ok(0)
    if (err) {
      throw err;
    }
    // Redis에서 refresh token 제거
    if (ok) {
      await redisClient.del(req.user_id);
      return res.json({message: "로그아웃이 완료되었습니다."});
    }
  }); 
  // ok(0)일 때
  throw new Error("제거할 Refresh token이 없습니다.");
}));

/* 회원 탈퇴 */
router.delete('/delete', authJWT, asyncHandler(async (req, res) => {
  const user = await User.findOne({
    user_id: req.user_id, 
    is_deleted: false
  });
  if (!user) {
    throw new Error("해당 사용자가 없습니다.");
  }

  await redisClient.exists(req.user_id, async (err, ok) => {   // true: ok(1), false: ok(0)
    if (err) {
      throw err;
    }
    // Redis에서 refresh token 제거
    if (ok) {
      await redisClient.del(req.user_id);

      user.is_deleted = true;
      await user.save();

      return res.json({message: "회원탈퇴가 완료되었습니다."});
    }
  });
  throw new Error("제거할 Refresh token이 없습니다.");
}));

/* 프로필 조회 */
router.get('/profile', authJWT, asyncHandler(async (req, res) => {
  const user = await User.findOne({
    user_id: req.user_id, 
    is_deleted: false
  });
  
  if (!user) {
    throw new Error("해당 사용자가 없습니다.");
  }

  res.json(user);
}));

/* 비밀번호 변경 */
router.put('/profile', authJWT, asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({
    user_id: req.user_id, 
    is_deleted: false
  });

  // 필수 입력 확인 + 공백 방지
  if (!password || !password.trim()) {
    throw new Error("변경할 비밀번호를 입력하세요.");
  }

  // 비밀번호 형식 제한
  const regex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/);
  if (!regex.test(password)) {
    throw new Error("영문, 숫자, 특수문자를 포함하여 6 ~ 20자로 입력하세요.");
  }
  
  // 유저 확인
  if (!user) {
    throw new Error("해당 사용자가 없습니다.");
  }

  user.password = hashPassword(password);
  await user.save();

  res.json({message: "비밀번호 변경이 완료되었습니다", user});
}));

module.exports = router;
