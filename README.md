# youtube 클론 프로젝트

## 1. Main Page

- 인기동영상와 여러가지 키워드의 영상 목록을 확인할 수 있음
- 키워드를 클릭하면 해당 키워드와 관련한 영상 목록을 서버에서 받아와 출력함(클릭 시 새로운 데이터 요청)
- 인기 동영상 => 모든 카테고리 인기 콘텐츠 목록(videos?chart=mostPopular 사용)
- 다른 키워드 中 카테고리가 있는 경우 => 해당 카테고리 id를 가진 인기 있는 콘텐츠 목록
- 다른 키워드 中 카테고리가 없는 경우 => 해당 키워드를 검색해서 나오는 콘텐츠 목록 (search?q=${keywords} 사용)

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

## 4. Channel Page

- 특정 채널 정보 페이지
- 채널 배널이 있는 경우 채널 타이틀 위에 배너가 나타나고, 없으면 출력되지 않음
- 홈, 동영상, 정보 탭으로 구성되어 있으며, 동영상 더 보기 버튼을 누르면 추가로 데이터를 얻어옴

## 5. History Page (시청기록)

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

## #Hooks

### @ convertCount

숫자 변환 훅 - 조회수, 구독자 변경할 때 사용

- 1000회 미만: 그대로 출력
- 1000~ 10000 : 1000으로 나눈 값
- 10000이상 : 10000으로 나눈 값

```js
export const convertCount = (num) => {
  if (1000 > num) return `${num}회`;

  if (1000 < num && num < 10000)
    return num % 1000 === 0
      ? `${parseInt(num / 1000)}천`
      : `${(num / 1000).toFixed(1)}천`;

  if (num >= 10000)
    return num % 10000 === 0
      ? `${parseInt(num / 10000)}만`
      : `${(num / 10000).toFixed(1)}만`;
};
```

[ect]  
 convertCount를 사용하지 않고, 그대로 출력할 때에는 .toLocaleString()를 사용해서 천단위마다 , 를 찍어줌

---

### @ requestAxios

youtube api 인스턴스

```js
export const requestAxios = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: KEY, regionCode: "kr" },
});
```

- baseURL, default params 설정
- requestAxios.get('',{params: {}}) 로 작성해서 사용

```js
// 사용

// 영상 목록 가져오기 (인기 기준)
export const requestPopularVideos = (videoCategory, maxResult = 32) =>
  requestAxios.get("videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      maxResults: maxResult,
      videoCategoryId: videoCategory && videoCategory,
    },
  });

// 검색결과 (영상 리스트)
export const requestSearchVideos = (query, maxResult = 32) =>
  requestAxios.get("search", {
    params: {
      part: "snippet",
      maxResults: maxResult,
      q: query,
      type: "video",
    },
  });
```

---

### @ searchContext

검색어, 검색 결과 전역관리하기 위해 만듬

- q: 검색어 (input에서 받아온 값)
- result: 검색 결과 목록 (받아온 데이터)

```js
// hooks/searchContext.js
export const ContextProvier = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState({ q: "", result: [] });

  const value = { searchQuery, setSearchQuery };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
```

```js
// pages/Search.js

const Search = () => {
  const { searchQuery } = useSearchContext();

  const { q, result } = searchQuery;
  return (
    <Layout aside={true}>
      <SearchContainer>
        <Title
          size={24}
          text={
            result.length === 0 ? "검색 결과가 없습니다." : `"${q}" 검색 결과`
          }
          mode={false}
        />

        {result && <VideoList videos={result} />}
      </SearchContainer>
    </Layout>
  );
};
```

- 값 가져와서 사용하기
- result가 있으면 "검색어 검색 결과" 출력
- result가 없으면 "검색 결과 없습니다." 출력
- result가 있을 때만 영상리스트 컴포넌트 출력

---

#### - youtube timestamp

https://stackoverflow.com/questions/71134812/how-to-jump-to-a-timestamp-in-a-youtube-iframe-in-react

https://developers.google.com/youtube/iframe_api_reference#seekTo

#### - 기타

- react-icons : https://react-icons.github.io/react-icons/icons?name=fa

---

### - Youtube Data Api

#### - 리소스 및 리소스 유형

| 리소스        | 설명                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activity      | - 특정 사용자가 youtube 사이트에서 실행한 작업의 정보를 포함 <br>- 동영상 평가, 동영상 공유, 동영상을 즐겨찾기에 추가, 채널 게시판에 게시 등이 포함됨                                       |
| channel       | - 단일 채널에 대한 정보를 포함                                                                                                                                                              |
| channelBanner | - 새로 업로드한 이미지를 채널의 배너 이미지로 설정하는데 사용할 URL을 식별                                                                                                                  |
| guideCategory | - 채널의 콘텐츠 또는 기타 지표(인기도)를 기반으로 채널에 연결하는 카테고리를 식별<br> - 사용자가 원하는 콘텐츠를 더 쉽게 찾을 수 있는 방법                                                  |
| playlist      | - 단일 유튜브 재생목록을 표시<br>- 재생목록은 순서대로 감상하거나 다른 사용자와 공유할 수 있는 영상 목록                                                                                    |
| playlistItem  | - 재생목록에 포함된 동영상과 같은 리소스를 식별<br> - 재생목록에서 사용되는 방식을 설명하는 세부정보도 포함되어 있음                                                                        |
| search result | 지정된 검색 매개변수와 일치하는 유투브 동영상, 채널 또는 재생목록의 정보를 포함<br> - 동영상과 같이 고유하게 식별할 수 있는 리소스를 보여주지만, 자체적으로는 영구적인 데이터를 가지지 않음 |
| subscription  | - 사용자의 구독 정보를 포함                                                                                                                                                                 |
| thumbnail     | 미리보기 이미지를 식별                                                                                                                                                                      |
| videos        | 매개변수와 일치하는 동영상 목록 반환                                                                                                                                                        |
| vidooCategory | 업로드된 동영상과 연결되었거나 연결할 수 있는 카테고리를 식별                                                                                                                               |

---

#### - 리소스 videos

`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=kr&maxResults=32&key=${KEY}`

##### part

- snippet : 기본 세부정보 (publishedAt,channelId,title,description,thumbnails(동영상썸네일),channelTitle,categoryId)
- statistics : 동영상 통계 (viewCount, likeCount, commentCount)
- contentDetails : 동영상 콘텐츠 정보 (contentDetails.contentRating.kmrbRating : 한국 동영상 평가)

##### ect

- chart=mostPopular
- videoCategoryId : 비디오카테고리 (chart 사용할 때 만 사용 가능)
- maxResult : 최대 검색결과
- regionCode : 지역/나라

---

#### - 채널 videos

`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`

#### part

- snippet : 기본 세부정보 (publishedAt,title(채널이름),description(채널설명),thumbnails(채널썸네일))
- contentDetails : 채널 정보 요약 (relatedPlaylists: 업로드된 영상 또는 채널과 관련된 재생목록을 식별하는 맵)
- statistics : 통계 (조회수, 댓글 수, 구독자 수, 업로드 영상 수)
- topicDetails : 채널과 관련된 freebase 주제 정보 요약
- brandingSettings : 채널 브랜드 정보 (채널 배너, 채널 제목, )

---

---

useContext API
https://beta.reactjs.org/reference/react/useContext

## 무한 스크롤

(https://tech.kakaoenterprise.com/149)

페이지 하단에 도달했을 때 API가 호출되며 콘텐츠가 끊기지 않고 계속 로드되는 사용자 경험 방식.

### 할일

6. 키워드 클릭 시 해당 키워드 관련 영상 데이터 가져오기
7. 컴포넌트 정리하기...

- 공유하기 버튼 만들기 (https://www.delftstack.com/ko/howto/react/react-copy-to-clipboard/)

---

1. 플레이리스트 데이터 가져와서 화면에 출력할 방법 생각하기 (https://developers.google.com/youtube/iframe_api_reference?hl=ko)

```
https://www.youtube.com/embed?listType=playlist&list=PLC77007E23FF423C6

list
list 매개변수는 listType 매개변수와 함께 플레이어에서 로드할 콘텐츠를 식별합니다.
listType 매개변수 값이 search인 경우 list 매개변수 값이 검색어를 지정합니다.
listType 매개변수 값이 user_uploads인 경우 list 매개변수 값이 로드할 동영상을 업로드한 YouTube 채널을 식별합니다.
listType 매개변수 값이 playlist인 경우 list 매개변수 값이 YouTube 재생목록 ID를 지정합니다. 매개변수 값에서 아래 예에 표시된 것처럼 재생목록 ID 앞에 PL 문자를 붙여야 합니다.

 매개변수는 재생할 동영상 ID의 쉼표로 구분된 목록을 지정합니다. 값을 지정하면 URL 경로에서 지정한 VIDEO_ID가 먼저 재생되며 playlist 매개변수에서 지정한 동영상이 그 후에 재생됩니다.


https://www.youtube.com/embed?
    listType=playlist
    &list=PLC77007E23FF423C6
참고: list 및 listType 매개변수의 값을 지정하면 IFrame 삽입 URL에서 동영상 ID를 지정할 필요가 없습니다.

```

2. start 변수 사용하면 특정 시간 이후 동영상 재생을 시작!

const axios_list = [dataRes, channelRes, sameChannel, sameCategory];

        axios.all(axios_list).then(
          axios.spread((...respon) => {
            console.log(respon);
          })
        );
