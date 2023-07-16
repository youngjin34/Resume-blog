import { useContext, useState } from "react";
import { BoardDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";


const AddBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const { onBoardCreate, onBoardEdit } = useContext(BoardDispatchContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!isEdit) {
      onBoardCreate(boardName);
      setBoardName("");
    } else {
      onBoardEdit(boardName);
    }
    navigate('/', { replace: true });
  };

  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setTimeout(() => {
      setIsHover(false);
    }, 5000)
  };

  return (
    <div>
      <div className="Menu-List"><b>Board List</b></div>
      <div className="AddBoard" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="AddMenu"><b>Add Board</b></div>
        {isHover &&
          <>
            <input
              maxLength="10"
              placeholder="게시판 추가"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <MyButton text={"추가"} type={"positive"} onClick={handleSubmit} />
          </>
        }
      </div>
    </div>
  );
};

export default AddBoard;
