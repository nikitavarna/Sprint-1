import React, { Component } from "react";
import ListStyle from './ListStyle.css';

const List = ({ items, deleteItem, editItem }) => {
    return (
      <div className="items">
        {items.map((item) => {
          const { id, title } = item;
          return (
            <div className="item" key={id}>
              {title}
              <button type="button" className="editButton" onClick={() => editItem(id)}>Edit</button>
              <button type="button" className="deleteButton" onClick={() => deleteItem(id)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
};
  
export default List;