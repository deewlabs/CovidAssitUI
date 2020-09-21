import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";

import SideDrawer from "./SideDrawer";
import LABELS from "../const/labels";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const anchor = "left";

function Header({ history, location }) {
  const classes = useStyles();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const list = () => (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setIsSideDrawerOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.list} role="presentation">
        <List>
          {[
            { label: LABELS.dasboard, pathname: "/dashboard" },
            { label: LABELS.listPatientForm, pathname: "/user-patient" },
            {
              label: LABELS.listHospitalReg,
              pathname: "/hospital-registration",
            },
            {
              label: LABELS.listPatientEnrollment,
              pathname: "/patient-enrollment",
            },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={handleListItemSelect(item)}
              onKeyDown={handleListItemSelect(item)}
              selected={item.pathname === location.pathname}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );

  const handleListItemSelect = (selectedListItem) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    history.push(selectedListItem.pathname);
    setIsSideDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setIsSideDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Covid Assist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <SideDrawer
        list={list()}
        anchor={anchor}
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
      />
    </div>
  );
}

export default withRouter(Header);
