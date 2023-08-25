# Json2Js
## 설명
  JSON을 JS로 변환해주는 코드입니다.
## 사용법
  ### for 반복문
  ```json
  {
    "name": "loop",
    "arguments": {
      "variable": "인덱스_기록_변수",
      "start": 0, // 시작 숫자
      "end": 5, // 끝 숫자
      "callback": [
        /* 코드 */
      ]
  }
  ```
  #### 결과
  ```js
  for (let 인덱스_기록_변수 = 0; 인덱스_기록_변수 < 5; 인덱스_기록_변수++) {
    /* 코드 */
  }
  ```
  ### console.log 로그
  ```json
  {
    "name": "print",
    "arguments": {
      "value": [
        "Hello, world!"
      ]
    }
  }
  ```
  #### 결과
  ```js
  console.log(`Hello, world!`);
  ```
  ### 변수
  ```json
  {
    "name": "variable",
    "type": "const" | "let" | "var",
    "id": "변수명",
    "value": "변수 값"
  }
  ```
  #### 결과
  ```js
  const | let | var 변수명 = "변수 값"
  ```
  ### 주석
  ```json
  {
    "name": "memo",
    "value": "주석 내용"
  }
  ```
  #### 결과
  ```js
  // 주석 내용
  ```
  ### 자바스크립트 코드
  ```json
  {
    "name": "js",
    "value": "console.log(`js코드`)"
  }
  ```
  ##### 결과
  ```js
  console.log(`js코드`)
  ```