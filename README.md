# youtube 클론 프로젝트

### 할일

1. api 연결하기 https://developers.google.com/youtube/v3/getting-started?hl=ko
2. 메인페이지 UI 만들기 (스타일드 컴포넌트 사용해서 스타일링하기)
3. 인기동영상 데이터 가져와서 출력하기
4. 검색 기능 만들기
5. 페이지네이션 or 무한스크롤 구현하기
6. 키워드 클릭 시 해당 키워드 관련 영상 데이터 가져오기
7. 컴포넌트 정리하기...

### Main Page

#### Header

- Logo, Search (검색창), icon으로 이루어진 컴포넌트

#### 기타

react-icons : https://react-icons.github.io/react-icons/icons?name=fa

### snippet : categoryId // channelId // thumbnail : 디폴트, 하이, 미디엄, 표준 // 타이틀

채널 id로 채널 정보 가져오기
`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`

useContext API
https://beta.reactjs.org/reference/react/useContext
