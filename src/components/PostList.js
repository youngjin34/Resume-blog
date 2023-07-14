import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostItem";


const sortOprionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlPost = React.memo(({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
  );
});

const PostList = ({ postList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const getProcessDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(postList));

    const sortedList = copyList.sort(compare);
    return sortedList;
  }

  return (
    <div className="PostList">
      <div className="position-relative">
        <div className="Post-Option">
          <ControlPost
            value={sortType}
            onChange={setSortType}
            optionList={sortOprionList}
          />
        </div>
        <div></div>
        <div className="Post-Item">
          <div>
            {
              getProcessDiaryList().map((it) => (
                <PostItem key={it.id} {...it} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

PostList.defaultProps = {
  postList: [],
};

export default PostList;