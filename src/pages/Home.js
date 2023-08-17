import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import BoardList from '../components/BoardList';
import Header from '../components/Header';
import { BoardStateContext, PostStateContext } from '../App';
import BoardAdd from '../components/BoardAdd';
import PostList from '../components/PostList';
import { useNavigate, useLocation } from 'react-router-dom';

const Page = ({ boardId }) => {
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
    setIsNew(location.pathname === `/new`);
  }, [location.pathname, boardId]);

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
        <Link to='/'><Header headText={headText} /></Link>
      </div>
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <BoardAdd />
              <BoardList boardList={boardData} />
            </div>
            <div className='Home-position col-6 position-relative List'>
              <h2 className='position-absolute top-0 start-0'>전체 글</h2>
              <PostList postList={postData} boardId={boardId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
