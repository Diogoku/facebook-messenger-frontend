import React, { useState } from "react";

// MATERIAL-UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";

// MATERIAL-UI ICONS
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// CSS
import "../css/chatInfoList.css";

function ChatInfoList({ title, actions }) {
  const [listStatus, setListStatus] = useState(false);

  const changeListStatus = () => setListStatus(!listStatus);

  return (
    <List component="nav" className="chatInfoList">
      <ListItem button onClick={changeListStatus}>
        <ListItemText primary={title} className="chatInfoList__title" />
        <ListItemIcon>
          <ArrowBackIosIcon
            fontSize="small"
            className={listStatus ? "iconOpenList" : "iconCloseList"}
          />
        </ListItemIcon>
      </ListItem>
      <Collapse in={listStatus} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {!actions
            ? null
            : actions.map((action, index) => (
                <ListItem button key={index}>
                  <ListItemText
                    primary={action.text}
                    className="chatInfoList__action"
                  />
                  <ListItemIcon>{action.icon}</ListItemIcon>
                </ListItem>
              ))}
        </List>
      </Collapse>
    </List>
  );
}

export default ChatInfoList;
