import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostDispatchContext } from "../App";

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
      <div>
        <div>{strDate}</div>
        <div>{title}</div>
        <div>{content.slice(0, 30)}</div>
      </div>
      <div>
        <button onClick={goEdit}>수정하기</button>
        <button onClick={handleRemove}>삭제하기</button>
      </div>
    </div>
  </div>
};

export default PostItem;