import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Board from './pages/Board';
import Post from './pages/Post';
import New from './pages/New';
import Edit from './pages/Edit';

import './App.css';

const boardReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case `CREATE`: {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case `REMOVE`: {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case `EDIT`: {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState;
};

const postReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case `CREATE`: {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case `REMOVE`: {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case `EDIT`: {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const BoardStateContext = React.createContext();
export const BoardDispatchContext = React.createContext();
export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

function App() {
  const [boardData, boDispatch] = useReducer(boardReducer, []);
  const boardId = useRef(0);
  const [postData, poDispatch] = useReducer(postReducer, []);
  const postId = useRef(0);

  const onBoardCreate = (boardName) => {
    boDispatch({
      type: `CREATE`,
      data: {
        id: boardId.current,
        boardName
      }
    });
    boardId.current += 1;
  };

  const onBoardRemove = (targetId) => {
    boDispatch({
      type: `REMOVE`,
      targetId
    });
  };

  const onBoardEdit = (targetId, boardName) => {
    boDispatch({
      type: `EDIT`,
      data: {
        id: targetId,
        boardName
      }
    });
  };

  const onPostCreate = (date, title, content) => {
    poDispatch({
      type: `CREATE`,
      data: {
        id: postId.current,
        date: new Date(date).getTime(),
        title,
        content
      }
    });
    postId.current += 1;
  };

  const onPostRemove = (targetId) => {
    poDispatch({
      type: `REMOVE`,
      targetId
    });
  };

  const onPostEdit = (targetId, date, title, content) => {
    poDispatch({
      type: `EDIT`,
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        title,
        content
      }
    });
  };

  return (
    <BoardStateContext.Provider value={boardData}>
      <BoardDispatchContext.Provider value={
        {
          onBoardCreate, onBoardRemove, onBoardEdit,
        }
      }>
        <PostStateContext.Provider value={postData}>
          <PostDispatchContext.Provider value={
            {
              onPostCreate, onPostRemove, onPostEdit
            }
          }>
            <BrowserRouter>
              <div className="App">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/board/:id' element={<Board />} />
                  <Route path='/new' element={<New />} />
                  <Route path='/edit/:id' element={<Edit />} />
                  <Route path='/post/:id' element={<Post />} />
                </Routes>
              </div>
            </BrowserRouter>
          </PostDispatchContext.Provider>
        </PostStateContext.Provider>
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}

export default App;
