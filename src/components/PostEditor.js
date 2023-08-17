import { useContext, useEffect, useRef, useState } from "react";
import { getStringDate } from "../util/date";
import { PostDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const PostEditor = ({ isEdit, originData, boardId }) => {
  const contentRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  const { onPostCreate, onPostEdit } = useContext(PostDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "게시글을 수정하시곘습니까?" : "새로운 게시글을 작성하시겠습니까?")) {
      if (!isEdit) {
        onPostCreate(date, title, content, boardId);
      } else {
        onPostEdit(originData.id, date, title, content);
      }
      navigate(`/board/${boardId}`, { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setTitle(originData.title);
      setContent(originData.content);
    }
  }, [isEdit, originData]);


  return (
    <div className="PostEditor">
      <Header
        headText={isEdit ? "게시글 수정하기" : "새 게시글 작성"}
      />
      <button onClick={() => navigate(-1)}>취소하기</button>
      <button onClick={handleSubmit}>작성 완료</button>
      <div className="wrapper">
        <div className="New_Content">
          <section>
            <h4 className="h4_date">날짜</h4>
            <div className="input_date">
              <input
                value={date}
                onChange={((e) => setDate(e.target.value))}
                type='date'
              />
            </div>
          </section>
          <section>
            <h4>제목</h4>
            <textarea
              className="PostEditor title"
              placeholder="제목을 입력하세요."
              ref={contentRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>
          <section>
            <h4>게시글 내용</h4>
            <div className="input_box text_wrapper">
              <textarea
                className="DiaryEditor content"
                placeholder="내용"
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </section>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;