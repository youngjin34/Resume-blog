import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDispatchContext, PostStateContext, BoardStateContext } from "../App"; // BoardStateContext를 추가
import { getStringDate } from "../util/date";

const Post = ({ boardId }) => {
  const { postId } = useParams();
  const postList = useContext(PostStateContext);
  const boardList = useContext(BoardStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [boardData, setBoardData] = useState(null);


  useEffect(() => {
    if (postList.length >= 1) {
      const targetPost = postList.find((it) => parseInt(it.id) === parseInt(postId));
      if (targetPost) {
        setData(targetPost);
      } else {
        alert("없는 게시글입니다.");
        navigate('/', { replace: true });
      }
    }
  }, [postId, postList]);

  useEffect(() => {
    if (boardList.length >= 1) {
      const targetBoard = boardList.find((board) => parseInt(board.id) === parseInt(boardId));
      if (targetBoard) {
        setBoardData(targetBoard);
      }
    }
  }, [boardId, boardList]);

  const { onPostRemove } = useContext(PostDispatchContext);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onPostRemove(postId);
      navigate(`/board/${boardId}`, { replace: true });
    }
  };

  if (!data || !boardData) {
    return <div>로딩중입니다...</div>;
  } else {
    return (
      <div>
        <button className="Post_button_1" onClick={() => navigate(`/board/${boardId}`)}>뒤로가기</button>
        <div className="Post_date">
          <b>{`${getStringDate(new Date(data.date))}`}</b>
        </div>
        <article>
          <section className="Post_h2">
            <h2><b>제목</b></h2>
            <div>
              <p className="PostTitle">
                {data.title}
              </p>
            </div>
          </section>
          <section>
            <h2><b>게시글</b></h2>
            <div
              className="PostContent"
              dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br>') }}
            />
          </section>
          <div>
            <button className="Post_button_2" onClick={() => navigate(`/edit/${postId}`)}>수정하기</button>
            <button className="Post_button_3" onClick={handleRemove}>삭제하기</button>
          </div>
        </article>
      </div>
    )
  }
};

export default Post;
