import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostDispatchContext } from "../App";

const PostItem = ({ id, date, title, content, boardId }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const [isPost, setIsPost] = useState(false);

  const goDetail = () => {
    if (!isPost) {
      navigate(`/post/${id}`);
      setIsPost(true);
    } else {
      alert("없는 게시글입니다.");
    }
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const { onPostRemove } = useContext(PostDispatchContext);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onPostRemove(id);
      navigate(`/board/${boardId}`, { replace: true });
    }
  };

  return <div>
    <div className="PostItem" onClick={goDetail}>
      <div className="Post row">
        <div>{strDate}</div>
        <div><b>제목: {title}</b></div>
        <div className="col-10 text-truncate">{content.slice(0, 30)}</div>
      </div>
    </div>
    <div>
      <div>
        <button className="Post_Button_1" onClick={goEdit}>수정하기</button>
        <button className="Post_Button_2" onClick={handleRemove}>삭제하기</button>
      </div>
    </div>
  </div>
};

export default PostItem;