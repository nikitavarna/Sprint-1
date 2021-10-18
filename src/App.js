import React, { useState } from "react";
import List from "./List";
import ListStyle from './ListStyle.css';
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } 
    else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearList = () => {
    setList([]);
  };
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  return (
    <div className="list">
      <form className="userInput" onSubmit={handleSubmit}>
          <input type="text" className="input" placeholder="Item" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="add">
            {isEditing ? "Edit" : "Submit"}
          </button>
      </form>
      {list.length > 0 && (
        <div className="listItems">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear" onClick={clearList}>
            Clear items
          </button>
        </div>
      )}
    </div>
  );
}

export default App;