import { useContext, useEffect, useState } from 'react';
import BoardList from './BoardList';
import Header from './Header';
import { BoardStateContext, PostStateContext } from '../App';
import AddBoard from './AddBoard';
import PostList from './PostList';
import { useNavigate, useLocation } from 'react-router-dom';

const Page = () => {
  const headText = "지니쓰 블로그";
  const boardList = useContext(BoardStateContext);
  const postList = useContext(PostStateContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [boardData, setBoardData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsNew(location.pathname === '/new');
  }, [location.pathname]);

  useEffect(() => {
    if (boardList.length >= 1) {
      const boardData = boardList.slice().sort((a, b) => a.id - b.id);
      setBoardData(boardData);
    }
  }, [boardList]);

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

  return (
    <div className='Home'>
      <div>
        <a href='/'><Header headText={headText} /></a>
      </div>
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <AddBoard />
              <BoardList boardList={boardData} />
            </div>
            <div className='Home-position col-6 position-relative List'>
              <div>
                {location.pathname.includes('/board') && !isNew ? (
                  <h2 className='position-absolute top-0 start-0'>글 목록</h2>)
                  : (
                    <h2 className='position-absolute top-0 start-0'>전체 글</h2>
                  )}
                {location.pathname.includes('/board') && !isNew && (
                  <button className="List-Button position-absolute top-0 start-100 translate-middle" onClick={() => navigate('/new')}>새 글 쓰기</button>
                )}
              </div>
              <PostList postList={postData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;