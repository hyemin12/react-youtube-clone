# youtube 클론 프로젝트

## 1. Main Page

- 인기동영상와 여러가지 키워드의 영상 목록을 확인할 수 있음
- 키워드를 클릭하면 해당 키워드와 관련한 영상 목록을 서버에서 받아와 출력함(클릭 시 새로운 데이터 요청)
- 인기동영상 => videos?chart=mostPopular 사용
- 다른 키워드 => search?q=${keywords} 사용

- Layout, VideoList

## 2. Video Page

- url 주소를 바탕으로 해당 영상 id값을 통해 상세 정보를 확인할 수 있는 페이지
- url 주소의 값을 바탕으로 id 추출
- iframe을 사용하여 유튜브 영상을 삽입
- state
  - data => 영화 상세 정보 {result:타이틀, 채널이름,설명, 업로드 날짜 등 ,statistic: 좋아요개수, 조회수 }
  - channel => 영상을 업로드한 채널 관련 정보 {subscribe: 구독자 수 등 ,thumbnail: 채널 썸네일 정보}
  - recommend => 추천 영상 목록
    {channel: 채널에서 업로드한 다른 영상 목록들, category: 해당 영상의 카테고리id가 같은 영상 목록들}

## 3. Search Page

- 검색창에 입력된 검색 데이터를 요청하고, 받아온 데이터를 출력하는 페이지
- 검색어, 데이터를 전역으로 관리 (path에 검색어 사용 /path={`/results/:search=${searchQuery.q}`})
- 검색 결과가 없을 경우 `검색 결과가 없습니다` 문구 출력, 검색 결과가 있을 경우 `${검색어} 검색 결과` 문구 출력

## . Not Found Page

- 설정된 path 이외의 경로가 입력될 경우 출력되는 페이지
- 페이지를 찾을 수 없다는 문구와 홈화면으로 이동할 수 있는 버튼으로 구성되어 있음

---

---

## #컴포넌트

### ＞ Header

- Logo, Search (검색창)으로 이루어진 컴포넌트

### ＞ Loading

- 데이터를 받아오는 시간동안 출력되는 컴포넌트

### ＞ RecommendTabs / RecommendItem

- RecommendTabs : 상단의 tab을 클릭한 경우, 활성화되는 콘텐츠를 출력하는 페이지
- RecommendItem : 활성화된 콘텐츠 아이템 (동영상 썸네일, 동영상 타이틀, 채널정보, 조회수, 업로드 날짜로 구성)

### ＞ Button / LikeButton

---

---

#### 기타

react-icons : https://react-icons.github.io/react-icons/icons?name=fa

### snippet : categoryId // channelId // thumbnail : 디폴트, 하이, 미디엄, 표준 // 타이틀

채널 id로 채널 정보 가져오기
`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`

useContext API
https://beta.reactjs.org/reference/react/useContext

## 무한 스크롤

(https://tech.kakaoenterprise.com/149)

페이지 하단에 도달했을 때 API가 호출되며 콘텐츠가 끊기지 않고 계속 로드되는 사용자 경험 방식.

### 할일

1. api 연결하기 https://developers.google.com/youtube/v3/getting-started?hl=ko
2. 메인페이지 UI 만들기 (스타일드 컴포넌트 사용해서 스타일링하기)
3. 인기동영상 데이터 가져와서 출력하기
4. 검색 기능 만들기
5. 페이지네이션 or 무한스크롤 구현하기
6. 키워드 클릭 시 해당 키워드 관련 영상 데이터 가져오기
7. 컴포넌트 정리하기...

- 유튜브로 이동하는 버튼
- 공유하기 버튼 만들기 (https://www.delftstack.com/ko/howto/react/react-copy-to-clipboard/)
