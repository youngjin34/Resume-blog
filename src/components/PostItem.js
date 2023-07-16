import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostDispatchContext } from "../App";
import BoardItem from "./BoardItem";

const PostItem = ({ id, date, title, content }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/post/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const { onPostRemove } = useContext(PostDispatchContext);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onPostRemove(id);
      navigate('/', { replace: true });
    }
  };

  return <div>
    <div className="PostItem" onClick={goDetail}>
      <div className="Post row">
        <div>{strDate}</div>
        <div>제목: {title}</div>
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