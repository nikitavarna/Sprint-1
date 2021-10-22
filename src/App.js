import React, { useState } from "react";
import ListStyle from './ListStyle.css';
import "./App.css";
import Button from '@material-ui/core/esm/Button'; 
import Typography from '@material-ui/core/esm/Typography';
import TextField from "@material-ui/core/esm/TextField";
//import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/esm/styles';
import { createMuiTheme,ThemeProvider } from "@material-ui/core/esm/styles";

const useStyles=makeStyles((theme) => {
  return({
    submitButton: {
      padding: '3px',
      margin: '5px'
    },
    clearButton: {
      padding: '3px',
      marginTop: '50px'
    },
    itemButtons : {

    }
  });
});
const themeX = createMuiTheme({
  palette: {
    type: "dark",
    primary:{
      main: '#42a5f5'
    },
    secondary:{
      main: '#90caf9'
    }
  }
});

function App() {
  const classes = useStyles();

  const List = ({ items, deleteItem, editItem }) => {
    return (
      <div className="items">
        {items.map((item) => {
          const { id, title } = item;
          return (
            <div className="item">
              <div className="itemName" key={id}>
              {title}
              </div>
              <div className="buttonContainer">
                <button type="button" className="classes.itemButtons" onClick={() => editItem(id)}>Edit</button>
                <button type="button" className="classes.itemButtons" onClick={() => deleteItem(id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
    <ThemeProvider theme={themeX}>
    <div className="list">
      <form className="userInput" onSubmit={handleSubmit}>
          <TextField id="outlined-basic" variant="outlined" margin="dense" className="input" placeholder="Item" value={name} onChange={(e) => setName(e.target.value)} color="success" focused />
          <Button variant="contained" type="submit" className={classes.submitButton} color="primary">
            {isEditing ? "Edit" : "Submit"} 
          </Button>
      </form>
      {list.length > 0 && (
        <div className="listItems">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <Button variant="contained" className={classes.clearButton} onClick={clearList} color="secondary">Clear</Button>
        </div>
      )}
    </div>
    </ThemeProvider>
  );
}

export default App;
