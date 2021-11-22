# Oson_Doson_v2

## React와 Node.js를 이용한 웹 기반 동물병원 관리 시스템의 구현

- 제 1 장 서론
- 제 2 장 이론적 배경
  - 2.1. Javascript
  - 2.2. React
  - 2.3. Node.js
- 제 3 장 동물병원 관리 시스템 설계
  - 3.1. 요구사항 분석
  - 3.2. 시스템 구성
  - 3.3. 서버
  - 3.4. 클라이언트
  - 3.5. 데이터베이스
- 제 4 장 동물병원 관리 시스템 구현 및 테스트
  - 4.1. 개발 환경
  - 4.2. 화면 구성
- 제 5 장 결론

---

## 초록

> 최근 한국 사회의 1인 세대화와 고령화가 급속하게 진행되면서 ‘펫팸족(Pet+Family)’이라는 신조어가 등장할 정도로 반려동물에 관한 개인의 관심과 수요가 증가하고 있다. 그 결과로, 식품, 케어 용품, 케어 서비스 뿐만 아니라 반려동물의 건강과 관련된 반려동물 시장 규모가 눈에 띄게 증가하고 있다.

> 이에, 본 논문은 동물병원 서비스와 관련하여 반려인들이 겪는 불편함에 주목하였고, 반려동물의 건강에 관한 진료 정보를 얻기 어렵다는 소비자들의 불만을 해결하기 위해 반려동물의 건강관리를 위한 전용 관리 및 지역 동물병원과의 연동을 통해 케어 서비스망의 구축과 반려동물을 기르는 사람들의 관리 서비스 운영을 위하여 필요한 Web Site의 구축에 관한 연구이다.

> 동물병원 관리 시스템은 최근 많이 이용되고 있는 Javascript 라이브러리인 React와 Javascript 런타임으로써 확장성 있는 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼인 Node.js를 이용하여 구현하도록 한다.

> 본 논문에서는 병원 사용자는 회원 관리 및 진료 내역 관리가 가능하고, 일반 사용자는 회원 가입 및 로그인, 동물병원 진료 예약, 진료 내역을 확인할 수 있는 사이트를 구현하였고, 해당 웹사이트의 제작과 설계 과정에 대해 기술하였으며, React와 Node.js를 사용해 구현함으로써 가지는 장단점에 대해 분석하였다.

> 병원 측 사용자는 회원 관리페이지에서 회원 조회 및 삭제, 진료 예약 내역 확인, 진료 내용을 입력하는 것을 가능하도록 하였으며, 일반 사용자는 회원 가입 및 로그인, 등록된 반려동물의 진료 예약 및 진료내역 확인이 가능하도록 구현하였다. 이는 반려인들이 반려동물의 건강 관리 내역을 한눈에 보고 쉽게 관리할 수 있도록 돕는다. 병원 또한 예약을 온라인으로 관리함으로써 진료 및 수술 시간을 더 쉽고 빠르게 확인이 가능하다.

---

## API 명세

| Index | Method | URI                      | Description    |
| ----- | ------ | ------------------------ | -------------- |
| 1     | POST   | /api/users/register      | 회원 가입      |
| 2     | POST   | /api/users/login         | 로그인         |
| 3     | GET    | /api/users/info          | 회원 정보 조회 |
| 4     | DELETE | /api/users/:id           | 회원 삭제      |
| 5     | POST   | /api/animals             | 동물 목록 조회 |
| 6     | POST   | /api/animals/animal_name | 동물 이름 조회 |
| 7     | POST   | /api/animals/animal_num  | 동물 번호 조회 |
| 8     | GET    | /api/hospitals           | 병원 목록 조회 |
| 9     | POST   | /api/hospitals/h_name    | 병원 이름 조회 |
| 10    | POST   | /api/hospitals/h_num     | 병원 번호 조회 |
| 11    | POST   | /api/appointment         | 진료 예약      |
| 12    | POST   | /api/appointment/check   | 예약 내역 조회 |
| 13    | POST   | /api/med_history         | 진료 내역 조회 |

## 화면 구성

### 1. 로그인 페이지와 메인 페이지

![image](https://user-images.githubusercontent.com/76952602/140646702-29cb8953-34c1-4d24-8f05-68ed4a81456e.png)

- 로그인 과정 서버 코드

```javascript
app.post("/api/users/login", (req, res) => {
  let userid = req.body.userid;
  let userpw = req.body.userpw;
  let sql = "SELECT * FROM USER WHERE userid = ?";
  let params = [userid, userpw];

  connection.query(sql, params[0], (err, row) => {
    if (err) console.log(err);

    if (row.length > 0) {
      //ID가 존재하면
      bcrypt.compare(params[1], row[0].userpw, (err, result) => {
        if (result) {
          res.cookie("loginUser", row[0].id).status(200).json({
            success: true,
            id: row[0].id,
            userid: userid
          });
          console.log("성공");
        } else {
          res.json({
            success: false,
            message: "비밀번호가 틀렸습니다."
          });
          console.log("비밀번호 틀림");
        }
      });
    } else {
      res.json({
        success: false,
        message: "존재하지 않는 id입니다."
      });
      console.log("id없음");
    }
  });
});
```

### 2. 회원 가입 페이지

![image](https://user-images.githubusercontent.com/76952602/140648067-b21d8b86-cf78-4e81-bdd1-fdd76ba5542c.png)

### 3. 진료 예약 페이지 화면

![image](https://user-images.githubusercontent.com/76952602/140647839-48168cc9-f24a-427a-bfb8-4512f788b17e.png)

### 4. 예약 내역 확인 페이지 화면

![image](https://user-images.githubusercontent.com/76952602/140647882-11a17002-40d4-413a-aaad-68d94b79d26a.png)

### 5. 진료 내역 확인 페이지 화면

![image](https://user-images.githubusercontent.com/76952602/140648136-a88a3946-eb7b-4eba-9880-2dd9b58115ef.png)

---

#### 2021년 학사학위 논문 작성을 위해 만든 프로젝트입니다. 자세한 내용은 논문 pdf, ppt 그리고 github 코드를 참조해주시면 감사하겠습니다!
