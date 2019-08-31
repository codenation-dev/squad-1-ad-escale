import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/styles/makeStyles";
import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    boxShadow: "none"
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

function SearchBar(props) {
  const classes = useStyles();
  let theme = useTheme();
  let biggerThanMD = useMediaQuery(theme.breakpoints.up("md"));
  return ((props.name === "navbar" &&
    biggerThanMD &&
    (props.match.path === "/:searchString" ||
    props.location.pathname === "/"))) ||
    (props.name === "mainPage" && !biggerThanMD) ? (
    <Box
      style={{
        flexGrow: 1,
        alignItems: "center"
      }}
    >
      <Grid container justify="center">
        {/* A partir de md a SearchBar integra na Navbar
                    Por conta disso a SearchBar não guarda a searchString
                    A SearchString é passada via props para a SearchBar
                */}
        <Grid item xs={10} sm={10}>
          <Paper className={classes.root} fullWidht>
            <InputBase
              className={classes.input}
              value={props.searchString}
              placeholder="Busque seu pet"
              onChange={props.onType}
              inputProps={{ "aria-label": "Pesquisar pet" }}
              autoFocus
            />
            <Divider className={classes.divider} />
            <IconButton
              className={classes.iconButton}
              aria-label="Buscar"
              onClick={event => props.onClickSearch(event)}
            >
              <SearchIcon />
            </IconButton>
            
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box
      style={{
        flexGrow: 1
      }}
    />
  );
}

export default withRouter(SearchBar);
