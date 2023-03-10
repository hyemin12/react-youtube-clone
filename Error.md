### `validateDOMNesting(...): <a> cannot appear as a descendant of <a>`.

LinkButton (Link) 태그 안에 LinkButton을 사용해서 생긴 오류.

- 비디오 아이템을 클릭하면 개별 영상페이지로 이동하는 LinkButton
- 채널 썸네일, 채널 타이틀 클릭하면 채널 페이지로 이동하는 LinkButton

개별 영상 페이지에서만 채널로 이동할 수 있도록 설정

[또 다른 해결 방안]  
비디오 페이지로 이동하는 Button을 영상 썸네일, 영상 타이틀을 클릭했을 때만 적용되도록 설정

-영상 썸네일, 영상 타이틀 => LinkButton to 비디오 페이지

-채널 썸네일, 채널 타이틀 => LinkButton to 채널 페이지

---

## `Expected `onClick`listener to be a function, instead got a value of`object` type.`

하위 컴포넌트에 props 전달할 때 발생하는 오류

```js
// 잘못 작성한 코드
{
  !videoData.nextPage && <Btn onClick={getMoreData()}>더보기</Btn>;
}

// 수정한 코드
{
  !videoData.nextPage && <Btn onClick={getMoreData}>더보기</Btn>;
}
```

## 데이터 요청 url를 확인하다가 google api를 깃허브에 업로드해서, 히스토리를 삭제하고 다시 업로드함

`

- git log
  // commit 로그 확인

- git reset HEAD^
  // 커밋을 바로 이전 상황으로 되돌아가기

- git reset HEAD~6
  // 최근 커밋을 기준으로 n번째 상황으로 되돌아가기

- git push -f origin master
  // 강제로 업로드하기
  `
