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
