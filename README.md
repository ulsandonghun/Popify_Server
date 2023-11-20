# Popify_Server
🌃영원하지 않은 공간으로부터의 무한한 순간들🎇 Popify 팝업스토어 입니다   

   
## 🖥️ 프로젝트 소개
<table>
  <tr>
    <td><img src="https://github.com/ulsandonghun/Kitsch-server/assets/58305106/b6fbcece-71df-44e9-87a0-7426c54803e1" width="500" height="300"></td>
    <td><img src="https://github.com/ulsandonghun/Kitsch-server/assets/58305106/bb6f51ca-dd71-4ed9-8380-9d4b804cbec1" width="500" height="300"></td>
  </tr>
</table>

  
### "**Popify**은 서울의 모든 팝업스토어/위치정보를 **담고** 있습니다."   
**popify**는 서울지역내 모든 팝업스토어의 위치정보와 굿즈정보/ 가격을 한눈에 알아볼수 있는 팝업스토어 정보 사이트입니다.

## 🥇 멤버 구성
+ `Front-end`
  + 정지훈 Dex  
  + Lily
+ `Dev-ops`
  + 최동훈 Harry  
+ `Server`
  + 최동훈 Harry
  + 조세영 Lucy 
  + 전희지 HUE 
<br/>

## 🏭 개발 환경
+ `Language`
  + Front-end : JS,CSS
  + DevOps : AWS -EC2, AWS S3
  + Server : NODE.js
+ `Framework`
  + Android : REACT
  + Server : EXPRESS
+ `Database : MongoDB`
+ `NO-SQL : MONGOOSE`
+ `Figma`
  https://www.figma.com/file/BmPnLFU6nA233E4kAuqSNe/Untitled?type=design&node-id=0-1&mode=design&t=jJe0vDuXxhtIIJUl-0

<br/>

## 📌 주요 기능 
## USER

- 회원가입 (아이디, 비밀번호~~, 이메일~~)
- 아이디 중복 확인
- 로그인
    - JWT 이용: access token(1시간), refresh token(2주)
- access token 재발급
- 로그아웃
    - refresh token DB에서 삭제
- 회원탈퇴 (status만 업데이트해서 리뷰 계속 보이게)

- 프로필 조회
- 프로필 변경 (비밀번호)

## POPUP

- 팝업스토어 목록 조회
    - 기본
    - 검색 - 제목 / 해시태그
    - 정렬 (별점 높은 순 - 사진만, 최신순 - 글 목록) - 메인화면 용
    - 페이지네이션 - 프론트엔드에서 무한스크롤 때문에 구현함
- 팝업스토어 상세페이지 조회
- 팝업스토어 사진등록 과정에서 AWS S3 이용

## GOODS

- 굿즈 목록 조회
    - 기본
    - 정렬 (별점 높은 순) - 메인화면 용
    

## REVIEW

- 내가 쓴 리뷰 목록 조회 - 마이페이지 용 (+ 로그인 상태 인증)
- 리뷰
    - 조회
    - 등록 (+ 로그인 상태 인증)
    - 삭제 (+ 로그인 상태 인증 및 내가 쓴 리뷰인지)

<br/>

## 기능 분배

Lucy: User

Harry: Popup

Hue: Goods, Review

## 📋 기능 소개

### `회원가입`
+ `Front-end`
  + Axios
    + REST API와 통신.


### `로그인`
+ `Server`
  + Redis 캐싱을 이용한 JWT를 사용하여 로그인 기능 구현.
### `팝업스토어`
+ `harry`
  +팝업스토어 인기순정렬, 무한스크롤 페이지네이션, AWS S3 자동화 코드 개발
