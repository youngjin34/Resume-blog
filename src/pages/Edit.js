import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostStateContext } from "../App";
import PostEditor from "../components/PostEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const postList = useContext(PostStateContext);

  useEffect(() => {
    if (postList.length >= 1) {
      const targetPost = postList.find((it) => parseInt(it.id) === parseInt(id));
      if (targetPost) {
        setOriginData(targetPost);
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [id, postList]);

  return <div>
    {originData && <PostEditor isEdit={true} originData={originData} />}
  </div>
};

export default Edit;