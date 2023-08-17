import { Link, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { useContext, useState } from "react";
import { BoardDispatchContext } from "../App";

const BoardItem = ({ boardName, id }) => {
  const { onBoardEdit, onBoardRemove } = useContext(BoardDispatchContext);
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedBoardName, setEditedBoardName] = useState(boardName);

  const navigate = useNavigate();

  const handleEdit = () => {
    if (editing) {
      onBoardEdit(id, editedBoardName);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedBoardName(boardName);
    setEditing(false);
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onBoardRemove(id);
    }
    navigate('/', { replace: true });
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="BoardItem" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="boardName">
        {editing ? (
          <div className="editingContainer">
            <input
              type="text"
              value={editedBoardName}
              onChange={(e) => setEditedBoardName(e.target.value)}
            />
            <div className="editingButtons">
              <MyButton text={"저장"} type={"negative"} onClick={handleEdit} />
              <MyButton text={"취소"} type={"negative"} onClick={handleCancel} />
            </div>
          </div>
        ) : (
          <>
            <Link to={`/board/${id}`}>
              {boardName}
            </Link>
            {hover && (
              <>
                <MyButton text={"수정"} type={"negative"} onClick={handleEdit} />
                <MyButton text={"삭제"} type={"negative"} onClick={handleRemove} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BoardItem;
