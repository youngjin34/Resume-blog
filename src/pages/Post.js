import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDispatchContext, PostStateContext } from "../App";
import Header from "../components/Header";
import { getStringDate } from "../util/date";


const Post = () => {
  const { id } = useParams();
  const postList = useContext(PostStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (postList.length >= 1) {
      const targetPost = postList.find((it) => parseInt(it.id) === parseInt(id));
      if (targetPost) {
        setData(targetPost);
      } else {
        alert("없는 게시글입니다.");
        navigate('/', { replace: true });
      }
    }
  }, [id, postList]);

  const { onPostRemove } = useContext(PostDispatchContext);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onPostRemove(id);
      navigate('/', { replace: true });
    }
  };

  if (!data) {
    return <div>로딩중입니다...</div>
  } else {
    return (
      <div>
        <Header headText={`${getStringDate(new Date(data.date))}`} />
        <button className="Post_button_1" onClick={() => navigate(-1)}>뒤로가기</button>
        <button className="Post_button_2" onClick={() => navigate(`/edit/${data.id}`)}>수정하기</button>
        <button className="Post_button_3" onClick={handleRemove}>삭제하기</button>
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
            <div className="PostContent">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }
};

export default Post;