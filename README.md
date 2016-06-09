# requestkr

[requestjs](https://github.com/request/request) 패키지를 이용하여 웹 크롤러를 구현할 경우,
온갖 짬뽕 한글 인코딩이 하나의 웹페이지에 개밥마냥 뒤죽박죽 섞여 있어 짜증나는 경우가 있다. 이 패키지는
이런 뭣 같은 한글 인코딩 처리를 자동으로 해준다. 즉, 개밥 인코딩 된 웹페이지를 마치 처음부터 깔끔하게
UTF-8로 인코딩 된 것 같은 착각이 들게 해준다.

----
A wrapper around [requestjs](https://github.com/request/request) to convert
non-UTF-8 Korean response to UTF-8.

## Installation

```
npm install requestkr
```
