import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function SideDrawer({ list, anchor, isOpen, onClose }) {
  const classes = useStyles();

  return (
    <div>
      <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
        {list}
      </Drawer>
    </div>
  );
}

export default SideDrawer;
