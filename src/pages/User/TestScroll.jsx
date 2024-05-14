import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function TestScroll() {
  const [dataSource, setDataSource] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    if (dataSource.length < 200) {
      setTimeout(() => {
        setDataSource(dataSource.concat(Array.from({ length: 20 })));
      }, 500);
    } else {
      setHasMore(false);
    }
  };
  const style= {
    border:'1 px solid green',
    margin:12,
    paddin:8,
  }
  return (
    <div>
        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>loading...</p>}
          endMessage={<p>You have covered all posts..</p>}
          height={500}
        >
          {dataSource.map((item, index) => {
            return <div style={style}>this is an item inside {index + 1} InfinteScroll</div>;
          })}
        </InfiniteScroll>
      </div>
  );
}

export default TestScroll;
