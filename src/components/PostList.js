import React, { useState, useEffect } from 'react';

import PostItem from './PostItem';

const sortOprionList = [
  { value: 'latest', name: '최신 순' },
  { value: 'oldest', name: '오래된 순' },
];

const ControlPost = React.memo(({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const PostList = ({ postList, boardId }) => {
  const [sortedPostList, setSortedPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevBlock, setPrevBlock] = useState(0);
  const [nextBlock, setNextBlock] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState({
    page: 1,
    sk: '',
    sv: '',
  });

  const getSortedPostList = () => {
    const compare = (a, b) => {
      if (search.sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(postList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  const handleSortChange = (value) => {
    setSearch({ ...search, sortType: value, page: 1 });
  };

  const handlePageChange = (page) => {
    setSearch({ ...search, page });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearch({ ...search, page: 1, sv: searchInput });
  };

  console.log(boardId);

  useEffect(() => {
    const sortedList = getSortedPostList();
    const pageSize = 6;
    const totalPage = Math.ceil(sortedList.length / pageSize);
    setLastPage(totalPage);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageList = sortedList.slice(startIndex, endIndex);
    setSortedPostList(currentPageList);

    const blockCount = 5;
    const blockStart = Math.floor((currentPage - 1) / blockCount) * blockCount + 1;
    const blockEnd = blockStart + blockCount - 1;
    setPrevBlock(blockStart - blockCount);
    setNextBlock(blockEnd + 1);
  }, [postList, currentPage, search]);

  const filteredPostList = sortedPostList.filter((post) => {
    const keyword = search.sv.toLowerCase();
    if (search.sk === 'title') {
      return post.title.toLowerCase().includes(keyword);
    } else if (search.sk === 'content') {
      return post.content.toLowerCase().includes(keyword);
    } else {
      return true;
    }
  });

  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const paginatedPostList = filteredPostList.slice(startIndex, endIndex);

  return (
    <div className="PostList">
      <div className="position-relative">
        <div className="Post-Option">
          <ControlPost
            value={search.sortType}
            onChange={handleSortChange}
            optionList={sortOprionList}
          />
        </div>
        <div className="Post_Item">
          <div className="row">
            <div className="col-6 cols1">
              {paginatedPostList.slice(0, Math.ceil(paginatedPostList.length / 2)).map((it) => (
                <PostItem key={it.id} {...it} boardId={boardId} />
              ))}
            </div>
            <div className="col-6 cols2">
              {paginatedPostList.slice(Math.ceil(paginatedPostList.length / 2)).map((it) => (
                <PostItem key={it.id} {...it} boardId={boardId} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="Pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          이전
        </button>
        {Array.from({ length: lastPage }).map((_, idx) => (
          <button
            key={idx}
            className={currentPage === idx + 1 ? 'active' : ''}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button disabled={currentPage === lastPage} onClick={() => handlePageChange(currentPage + 1)}>
          다음
        </button>
      </div>
      <div className='Search'>
        <div className="Search_detail">
          <select
            name="sk"
            value={search.sk}
            onChange={(e) => setSearch({ ...search, sk: e.target.value, page: 1 })}>
            <option value="">- 선택 -</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>
          <input
            type="text"
            name="sv"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
