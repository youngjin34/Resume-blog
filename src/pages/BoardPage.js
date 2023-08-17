import React, { useContext, useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BoardStateContext, PostStateContext } from '../App';

import Header from '../components/Header';
import BoardAdd from '../components/BoardAdd';
import BoardList from '../components/BoardList';
import PostList from '../components/PostList';

const BoardPage = ({ boardId }) => {
  const headText = "지니쓰 블로그";
  const boardList = useContext(BoardStateContext);
  const postList = useContext(PostStateContext);

  const navigate = useNavigate();
  const location = useLocation();

  const filteredPosts = postList.filter((post) => post.boardId === boardId);


  const [boardData, setBoardData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const [isNew, setIsNew] = useState(false);


  useEffect(() => {
    if (postList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setPostData(postList.filter((it) => firstDay <= parseInt(it.date) && parseInt(it.date) <= lastDay));
    }
  }, [postList, curDate]);

  useEffect(() => {
    setIsNew(location.pathname === `/new`);
  }, [location.pathname, boardId]);

  useEffect(() => {
    if (boardList.length >= 1) {
      const boardData = boardList.slice().sort((a, b) => a.id - b.id);
      setBoardData(boardData);
    }
  }, [boardList]);

  return (
    <div className='Home'>
      <div>
        <Link to='/'><Header headText={headText} /></Link>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <BoardAdd />
            <BoardList boardList={boardData} />
          </div>
          <div className='Home-position col-6 position-relative List'>
            <h2 className='position-absolute top-0 start-0'>글 목록</h2>
            <PostList postList={filteredPosts} boardId={boardId} />
            <button
              className="List-Button position-absolute top-0 start-100 translate-middle"
              onClick={() => {
                navigate(`/new`);
              }}
            >
              새 글 쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
