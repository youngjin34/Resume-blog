import BoardItem from "./BoardItem";

const BoardList = ({ boardList }) => {

  return <div>
    {boardList.map((it) => (
      <BoardItem key={it.id} {...it} />
    ))}
  </div>
};

BoardList.defaultProps = {
  boardList: []
};

export default BoardList;