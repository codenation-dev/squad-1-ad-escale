import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Fab,
  Input
} from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../components/Logo/index.png";
import User from "../../components/img/user.png";
import Skeleton from "@material-ui/lab/Skeleton";
import { logout } from "../../services/auth";
import Axios from "axios";

const useStyles = makeStyles({
  avatar: {
    margin: "10px",
    marginTop: "1rem",
    border: "solid #fff 4px",
    width: 134,
    height: 134,
    backgroundColor: "#fff"
  },
  smallAvatar: {
    marginRight: 5,
    width: 50,
    height: 50,
    backgroundColor: "#eaf6ff"
  },
  card: {
    position: "relative",
    width: "100%"
  },
  cardItem: {
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  backTop: {
    height: "172px",
    position: "absolute",
    width: "100%",
    padding: "0",
    backgroundColor: "#42a5f5",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  item: {
    backgroundColor: "#42a5f5",
    height: "80px",
    paddingTop: "2rem"
  },
  fabSave: {
    margin: "10px",
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17"
    }
  },
  addPet: {
    margin: "10px",
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17"
    }
  },
  fab: {
    margin: "10px"
  },
  input: {
    width: "90%",
    color: "#fff",
    "&:hover": {
      borderBottom: "#fff"
    }
  }
});

const UserProfile = props => {
  const [info, setInfo] = useState(false);
  const [pets, setPets] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState({
    username: "",
    email: "",
    cellphone: "",
    name: ""
  });

  const classes = useStyles();

  const handleLogOut = e => {
    e.preventDefault();
    if (logout()) {
      props.handleLogOut(e);
      props.history.push("/");
    }
  };

  useEffect(() => {
    const token = "Token " + localStorage.getItem("@buscapet-Token");
    const id = localStorage.getItem("@buscapet-ID");
    Axios.get("https://kimmikirino.pythonanywhere.com/user/" + id, {
      headers: { Authorization: token }
    })
      .then(response => {
        setInfo(response.data);
        setValue({
          username: response.data.username,
          email: response.data.email,
          cellphone: response.data.cellphone,
          name: response.data.name
        });
      })
      .catch(error => props.history.push("/"));
  }, [props]);

  useEffect(() => {
    Axios.get(
      "https://kimmikirino.pythonanywhere.com/petfind/?search=" + info.email
    )
      .then(response => setPets(response.data))
      .catch(error => console.log(error));
  }, [info]);

  const Loading = () => {
    return (
      <>
        <Grid
          style={{ margin: "1rem" }}
          item
          xs={12}
          sm={5}
          md={5}
          lg={5}
          xl={4}
        >
          <Card className={classes.cardItem}>
            <CardContent style={{ padding: "7px" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                  <Skeleton variant="circle" width={40} height={40} />
                </Grid>
                <Grid item xs={9} sm={9} md={10} lg={10} xl={10}>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                    <div style={{ margin: "5px" }}>
                      <Skeleton variant="rect" width="100%" height={10} />
                    </div>
                    <div style={{ margin: "5px" }}>
                      <Skeleton variant="rect" width="50%" height={10} />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          style={{ margin: "1rem" }}
          item
          xs={12}
          sm={5}
          md={5}
          lg={5}
          xl={4}
        >
          <Card className={classes.cardItem}>
            <CardContent style={{ padding: "7px" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                  <Skeleton variant="circle" width={40} height={40} />
                </Grid>
                <Grid item xs={9} sm={9} md={10} lg={10} xl={10}>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                    <div style={{ margin: "5px" }}>
                      <Skeleton variant="rect" width="100%" height={10} />
                    </div>
                    <div style={{ margin: "5px" }}>
                      <Skeleton variant="rect" width="50%" height={10} />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  };

  const handleSave = e => {
    e.preventDefault();
    const token = "Token " + localStorage.getItem("@buscapet-Token");
    const url = "https://kimmikirino.pythonanywhere.com/user/" + info.id + "/";
    const config = {
      headers: { "content-type": "multipart/form-data", Authorization: token }
    };
    const formData = new FormData();
    formData.append("username", value.email);
    formData.append("email", value.email);
    formData.append("cellphone", value.cellphone);
    formData.append("name", value.name);
    Axios.put(url, formData, config)
      .then(back())
      .catch(error => console.log(error));
  };

  const handleDelete = e => {
    e.preventDefault();
    const token = "Token " + localStorage.getItem("@buscapet-Token");
    const url = "https://kimmikirino.pythonanywhere.com/user/" + info.id + "/";
    Axios.delete(url, { headers: { Authorization: token } })
      .then(function() {
        localStorage.clear();
        back();
      })
      .catch(error => console.log(error));
  };

  function back() {
    props.history.push("/");
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={10} md={10} lg={8}>
        <Card className={classes.card}>
          <div className={classes.backTop}></div>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              item
              style={{ maxHeight: "126px" }}
              xs={12}
              sm={3}
              md={3}
              lg={3}
            >
              <Avatar src={User} className={classes.avatar} />
            </Grid>
            <Grid item className={classes.item} xs={12} sm={9}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  marginLeft: "5px",
                  alignSelf: "center",
                  color: "#fff"
                }}
              >
                <Grid container>
                  {edit === false ? (
                    <>
                      <Grid item xs={8} sm={8} lg={7} xl={7}>
                        <Grid item xs>
                          <Typography
                            variant="subtitle2"
                            component="span"
                            style={{ marginRight: "10px" }}
                          >
                            Nome: {value.name}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle2" component="span">
                            Fone: {value.cellphone}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle2" component="span">
                            E-mail: {value.username}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={4} sm={4} lg={5} xl={5}>
                        <Fab
                          color="primary"
                          aria-label="add"
                          className={classes.fab}
                          onClick={() => setEdit({ edit: true })}
                        >
                          <EditIcon />
                        </Fab>
                        <RouterLink
                          style={{ textDecoration: "none" }}
                          to={"/adicionar-pet"}
                        >
                          <Fab
                            color="primary"
                            aria-label="add"
                            className={classes.addPet}
                          >
                            <AddIcon />
                          </Fab>
                        </RouterLink>
                        <Fab
                          color="secondary"
                          aria-label="add"
                          className={classes.fab}
                          onClick={e => handleLogOut(e)}
                        >
                          <PowerSettingsNewIcon />
                        </Fab>

                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={8} sm={8} lg={7} xl={7}>
                        <Grid item xs>
                          <Input
                            defaultValue={value.name}
                            onChange={e => setValue({ name: e.target.value })}
                            className={classes.input}
                            inputProps={{
                              "aria-label": "name"
                            }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Input
                            defaultValue={value.cellphone}
                            onChange={e =>
                              setValue({ cellphone: e.target.value })
                            }
                            className={classes.input}
                            inputProps={{
                              "aria-label": "cellphone"
                            }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Input
                            defaultValue={value.username}
                            onChange={e =>
                              setValue({ username: e.target.value })
                            }
                            className={classes.input}
                            inputProps={{
                              "aria-label": "username"
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={4} sm={4} lg={5} xl={5}>
                        <Fab
                          aria-label="add"
                          className={classes.fabSave}
                          onClick={e => handleSave(e)}
                        >
                          <SaveIcon />
                        </Fab>
                        <Fab
                          aria-label="del"
                          color="secondary"
                          onClick={e => handleDelete(e)}
                        >
                          <DeleteForeverIcon />
                        </Fab>
                      </Grid>
                    </>
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
          <CardContent style={{ padding: "10px", marginTop: "1rem" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minHeight: "10rem" }}
            >
              {pets ? (
                pets.map((data, i) => (
                  <Grid
                    key={i}
                    style={{ margin: "1rem" }}
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={4}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/petfind/" + data.id + "/"}
                    >
                      <Card className={classes.cardItem}>
                        <CardContent style={{ padding: "7px" }}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                              <Avatar
                                alt="Userimg"
                                src={Logo}
                                className={classes.smallAvatar}
                              />
                            </Grid>
                            <Grid item xs={9} sm={9} md={10} lg={10} xl={10}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={10}
                                lg={10}
                                xl={10}
                              >
                                <Typography
                                  variant="body2"
                                  component="span"
                                  style={{ marginRight: "10px" }}
                                >
                                  <Box
                                    style={{ display: "contents" }}
                                    fontWeight="fontWeightBold"
                                  >
                                    Nome:{" "}
                                  </Box>
                                  {data.name}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={10}
                                lg={10}
                                xl={10}
                              >
                                <Typography variant="body2" component="span">
                                  <Box
                                    style={{ display: "contents" }}
                                    fontWeight="fontWeightBold"
                                  >
                                    Publicado em :{" "}
                                  </Box>
                                  {new Date(data.date).toLocaleDateString()}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Loading />
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withRouter(UserProfile);
