import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostStateContext } from "../App";
import PostEditor from "../components/PostEditor";

const Edit = ({ boardId }) => {
  const [originData, setOriginData] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  const postList = useContext(PostStateContext);

  useEffect(() => {
    if (postList.length >= 1) {
      const targetPost = postList.find((it) => parseInt(it.id) === parseInt(postId));
      if (targetPost) {
        setOriginData(targetPost);
      } else {
        navigate(`/board/${boardId}`, { replace: true });
      }
    }
  }, [postId, postList]);

  return (
    <div>
      {originData ? (
        <PostEditor isEdit={true} originData={originData} boardId={boardId} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
};

export default Edit;