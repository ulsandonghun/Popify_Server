const express = require('express');
const router = express.Router();

const User = require('../models/User');

const async_handler = require('../utils/async-handler');
const hash_password = require('../utils/hash-password');

/* 회원가입 */
router.post('/signup', async_handler(async (req, res) => {
  const { user_id, password } = req.body;
  const hashed_password = hash_password(password);

  // 필수 입력 확인 + 공백 방지
  if (!user_id.trim()) {
    return res.status(400).json({message: "아이디를 입력하세요."});
  }
  if (!password.trim()) {
    return res.status(400).json({message: "비밀번호를 입력하세요."});
  }

  // 아이디 중복 확인
  if (await User.exists({user_id})) {
    return res.status(409).json({message: "이미 사용 중인 아이디입니다."});
  }

  const user = await User.create({
    user_id, 
    password: hashed_password
  });

  res.json({message: "회원가입이 완료되었습니다.", user});
}));

/* 아이디 중복 확인 */
router.get('/id/:user_id/exist', async_handler(async (req, res) => {
  const { user_id } = req.params;

  if (await User.exists({user_id})) {
    return res.status(409).json({message: "이미 사용 중인 아이디입니다."});
  }

  res.json({message: "사용 가능한 아이디입니다."});
}));

/* 로그인 */
router.post('/login', async_handler(async (req, res) => {
  
}));

/* 회원 탈퇴 */
router.delete('/delete', async_handler(async (req, res) => {
  
}));

/* 프로필 조회 */
router.get('/profile', async_handler(async (req, res) => {
  
}));

/* 비밀번호 변경 */
router.patch('/profile', async_handler(async (req, res) => {
  
}));

module.exports = router;
