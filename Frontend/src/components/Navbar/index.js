import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import SearchBar from "../SearchBar";
import Avatar from "@material-ui/core/Avatar";
import logo from "../Logo/index.png";
import { Grid } from "@material-ui/core";
import {isAuthenticated} from '../../services/auth';
import AddPetButton from "../../components/AddPetButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  user: {
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17",
      color: "#fff",
      },
      fontSize: "13px",
    },
  addPet: {
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17",
      color: "#fff"
    },
    fontSize: "13px",
    marginRight: "7px"
  },
  avatar: {
    margin: 2,
    width: 60,
    height: 60
  }
}));

const ButtonAppBar = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#00c853" }} position="static">
        <Toolbar>
          <Grid
            style={{width: "auto"}}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <RouterLink
                  style={{ color: "#fff", textDecoration: "none" }}
                  to="/"
                >
            <Grid item>
              <Avatar alt="Logo" src={logo} className={classes.avatar} />
            </Grid>
            </RouterLink>
            <RouterLink
                  style={{ color: "#fff", textDecoration: "none" }}
                  to="/"
                >
            <Grid item xs={false} sm={false} md={false} lg={false}>
              <Typography variant="h6" className={classes.title}>
                GetPet                
              </Typography>
            </Grid>
            </RouterLink>
          </Grid>
          <SearchBar
            name={"navbar"}
            searchString={props.searchString}
            onType={props.onType}
            onClickSearch={props.onClickSearch}
          />

          <AddPetButton name="Navbar"/>

          {isAuthenticated() ? (
            <>
              <RouterLink style={{ textDecoration: "none" }} to="/perfil">
                <Button className={classes.user}>Meu perfil</Button>
              </RouterLink>
            </>
          ) : (
            <RouterLink style={{ textDecoration: "none" }} to="/entrar">
              <Button
                
                className={classes.user}
              >
                Entrar
              </Button>
            </RouterLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
