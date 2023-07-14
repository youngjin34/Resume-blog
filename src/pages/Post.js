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
    <div>
      <Header headText={`${getStringDate(new Date(data.date))}`} />
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <button onClick={() => navigate(`/edit/${data.id}`)}>수정하기</button>
      <button onClick={handleRemove}>삭제하기</button>
      <article>
        <section>
          <h2>제목: {data.title}</h2>
        </section>
        <section>
          <h4>게시글</h4>
          <div>
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  }
  return <div></div>
};

export default Post;