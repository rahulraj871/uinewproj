/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import PublicIcon from "@material-ui/icons/Public";
const styles = (theme) => ({
  root: {
    position: "absolute",
    right: 0
  },
  iconColor: {
    color: "white",
    marginLeft: "20px"
  },
  clrIcon: {
    color: "white"
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  }
});

const AppBarCollapse = (props) => (
  <div className={props.classes.root}>
    <ButtonAppBarCollapse>
      <MenuItem color="inherit">
        <FacebookIcon />
      </MenuItem>
      <MenuItem color="inherit">
        <TwitterIcon />
      </MenuItem>
      <MenuItem color="inherit">
        <InstagramIcon />
      </MenuItem>
      <MenuItem color="inherit">
        <PublicIcon />
      </MenuItem>
      <MenuItem color="inherit">
        <PersonIcon />
      </MenuItem>
    </ButtonAppBarCollapse>
    <div className={props.classes.buttonBar} id="appbar-collapse">
      <IconButton className={props.classes.clrIcon} aria-label="delete">
        <FacebookIcon />
      </IconButton>
      <IconButton className={props.classes.clrIcon} aria-label="delete">
        <TwitterIcon />
      </IconButton>
      <IconButton className={props.classes.clrIcon} aria-label="delete">
        <InstagramIcon />
      </IconButton>
      <IconButton className={props.classes.clrIcon} aria-label="delete">
        <PublicIcon />
      </IconButton>
      <IconButton className={props.classes.iconColor} aria-label="delete">
        <PersonIcon />
      </IconButton>
    </div>
  </div>
);

export default withStyles(styles)(AppBarCollapse);
