# Json2Js
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
