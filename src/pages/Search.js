import styled from "styled-components";

import { useSearchContext } from "../hooks/searchContext";

import Layout from "../components/structure/Layout";
import Title from "../components/Title";
import VideoItemRow from "../components/VideoItemRow";
import ChannelItem from "../components/ChannelItem";

// 검색 결과 페이지
// path={`/results/:search=${searchQuery.q}`}
const Search = () => {
  const { searchQuery } = useSearchContext();

  const { q, result, channel } = searchQuery;

  if (!searchQuery.q) {
    return (
      <Layout aside={true}>
        <Title text={"검색어를 입력하세요"} />
      </Layout>
    );
  }
  return (
    <Layout aside={true}>
      <Section>
        <Title
          size={24}
          text={
            result.length === 0 ? "검색 결과가 없습니다." : `"${q}" 검색 결과`
          }
          mode={false}
        />

        {result && (
          <div style={{ width: "75vw" }}>
            {channel
              .filter((element) => element.snippet.channelTitle === q)
              .map((element) => (
                <ChannelItem item={element.snippet} />
              ))}
            {result.map((item) => (
              <VideoItemRow {...item} key={item.etag} />
            ))}

            <hr />
            <Section>
              <Title size={20} text={"추천채널"} />
              {channel &&
                channel
                  .filter((element) => element.snippet.channelTitle !== q)
                  .map((element) => <ChannelItem item={element.snippet} />)}
            </Section>
          </div>
        )}
      </Section>
    </Layout>
  );
};

const Section = styled.div`
  padding: 10px 0;
`;

export default Search;
