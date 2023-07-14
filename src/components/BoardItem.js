import { useContext, useState } from "react";

import { BoardDispatchContext } from "../App";
import MyButton from "./MyButton";

const BoardItem = ({ boardName, id }) => {
  const { onBoardEdit, onBoardRemove } = useContext(BoardDispatchContext);
  const [hover, setHover] = useState(false);

  const handelEdit = () => {
    onBoardEdit(id);
  }
  const handleRemove = () => {
    onBoardRemove(id);
  };

  const onMouseEnter = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };

  const url = `/board/${id}`;

  return (
    <div className="BoardItem" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="boardName">
        <a href={url}>{boardName}</a>
        {hover && (
          <>
            <MyButton text={"수정"} type={"negative"} onClick={handelEdit} />
            <MyButton text={"삭제"} type={"negative"} onClick={handleRemove} />
          </>
        )}
      </div>
    </div>
  )
};

export default BoardItem;