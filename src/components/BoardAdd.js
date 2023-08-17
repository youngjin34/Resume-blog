import { useContext, useState } from "react";
import { BoardDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";


const BoardAdd = () => {
  const [boardName, setBoardName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const { onBoardCreate, onBoardEdit } = useContext(BoardDispatchContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!isEdit) {
      onBoardCreate(boardName);
      setBoardName("");
      setIsAdd(false);
    } else {
      onBoardEdit(boardName);
    }
    navigate('/', { replace: true });
  };

  const handleShowAdd = () => {
    setIsAdd(true);
    setBoardName("");
  };

  const handleCancel = () => {
    setIsAdd(false);
  };

  return (
    <div>
      <div className="Menu-List"><b>Board List</b></div>
      {isAdd ? (
        <div>
          <h2>게시판</h2>
          <input
            type="text"
            placeholder="게시판 추가"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <MyButton text={"추가"} type={"positive"} onClick={handleSubmit} />
          <MyButton text={"취소"} type={"positive"} onClick={handleCancel} />
        </div>
      ) : (
        <div>
          <h2>게시판</h2>
          <MyButton text={"추가"} type={"positive"} onClick={handleShowAdd} />
        </div>
      )}
    </div>
  );
};

export default BoardAdd;
