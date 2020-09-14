import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ErrorBanner({ errorMSG }) {
  const classes = useStyles();
  return errorMSG ? (
    <div className={classes.root}>
      <Alert severity="error">{errorMSG}</Alert>
    </div>
  ) : null;
}

export default ErrorBanner;
