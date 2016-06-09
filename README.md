# request-korean

[requestjs](https://github.com/request/request) 패키지를 이용하여 웹 크롤러를 구현할 경우,
온갖 짬뽕 한글 인코딩이 하나의 웹페이지에 개밥마냥 뒤죽박죽 섞여 있어 짜증나는 경우가 있다. 이 패키지는
이런 뭣 같은 한글 인코딩 처리를 자동으로 해준다. 즉, 개밥 인코딩 된 웹페이지를 마치 처음부터 깔끔하게
UTF-8로 인코딩 된 것 같은 착각이 들게 해준다.

A wrapper around [requestjs](https://github.com/request/request) to convert
non-UTF-8 Korean response to UTF-8.

## Installation

```
npm install request-korean
```

## Example

code:

```js
const request = require('request');
request.get('http://blog.naver.com/', (err, resp, body) => {
  console.log(body);
});
```

result:

```html
<meta http-equiv="Pragma" content="No-Cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
<meta property="og:title" content="���̹� ���α�"/>
<meta property="og:image" content="http://blogimgs.naver.net/nblog/feed/og_feed_1200_image.png"/>
<meta property="og:image" content="http://blogimgs.naver.net/nblog/feed/og_feed_600_image.png"/>
<meta property="og:description" content="���� �۰� ���ο� �̿��� ������ ��"/>
<meta http-equiv="refresh" content="0; url=http://section.blog.naver.com">
```

물론 request 옵션에는 `encoding` 항목이 있지만, 사실 `euckr`, `cp949` 등의 인코딩은 지원되지 않는다.
[이곳](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings)
에서 지원되는 인코딩 목록을 확인할 수 있다.

Of course, Request has the `encoding` field as an option, but it does not support
encodings for Korean like `euckr` or `cp949`.
You can find the full list of supported encodings   [here](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings).


Request는 기본적으로 한글 인코딩 처리를 지원하지 않기 때문에, [iconv](https://github.com/bnoordhuis/node-iconv)
와 같은 패키지를 이용하여 따로 처리를 해야한다. 하지만 이 패키지를 이용하면 위와 거의 동일한 코드로도
번거로운 작업을 손쉽게 처리할 수 있다.

Request does not support encodings for Korean, so you need to use other packages
like [iconv](https://github.com/bnoordhuis/node-iconv) to convert the encoding,
but if you use this package, you can do it easily with nearly the exact same
code as the example above:

code:

```js
const request = require('request-korean');
request.get('http://blog.naver.com/', (err, resp, body) => {
  console.log(body);
});
```

result:

```html
<meta http-equiv="Pragma" content="No-Cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
<meta property="og:title" content="네이버 블로그"/>
<meta property="og:image" content="http://blogimgs.naver.net/nblog/feed/og_feed_1200_image.png"/>
<meta property="og:image" content="http://blogimgs.naver.net/nblog/feed/og_feed_600_image.png"/>
<meta property="og:description" content="좋은 글과 새로운 이웃을 만나는 곳"/>
<meta http-equiv="refresh" content="0; url=http://section.blog.naver.com">
```

## ANY CONTRIBUTION IS WELCOME!!

수정하거나 개선할 게 있다면 무엇이든 환영합니다. 심지어 오타 하나만 수정하더라고 좋습니다. [이슈](https://github.com/buo/request-korean/issues) 페이지에 이슈를 추가하거나, 여유가 되신다면
Pull Request를 보내주세요.

Don't be afraid to contribute. Even a commit that fixes a trivial typo is welcome.
Create an issue [here](https://github.com/buo/request-korean/issues), or if you
have spare time, please send me a pull request.
