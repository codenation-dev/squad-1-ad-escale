import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardContent, Fab } from "@material-ui/core";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import SemFoto from "../../components/img/SemFoto.png";
import wallpaper from "../../components/img/wallpaper.jpg";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Script from "react-load-script";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";

const useStyles = makeStyles({
  avatar: {
    margin: "auto",
    marginTop: "3rem",
    border: "solid #fff 4px",
    width: 134,
    height: 134,
    backgroundColor: "#fff"
  },
  card: {
    position: "relative"
  },
  backTop: {
    height: "128px",
    position: "absolute",
    width: "100%",
    padding: "0",
    backgroundImage: `url("${wallpaper}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  fab: {
    margin: "1rem"
  }
});

const InfoPet = props => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    center: [-23, 5486, -46, 6392],
    zoom: 13,
    provider: "wikimedia",
    metaWheelZoom: true,
    twoFingerDrag: true,
    animate: true,
    animating: false,
    zoomSnap: true,
    mouseEvents: true,
    touchEvents: true,
    minZoom: 10,
    maxZoom: 18,
    dragAnchor: [-23, 5486, -46, 6392]
  });

  function geocodeAddress() {
    let geocoder;
    let address = info.location;
    // eslint-disable-next-line
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
      if (status === "OK") {
        setValues({
          center: [
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          ]
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  const [info, setInfo] = useState(false);
  const [idpet, setIdpet] = useState();
  const [contact, setContact] = useState();

  const item = props.location.pathname;

  useEffect(() => {
    axios
      .get("http://kimmikirino.pythonanywhere.com" + item)
      .then(function(response) {
        setInfo(response.data);
        setContact(response.data.contact.cellphone);
        setIdpet(response.data.contact.id);
      })
      .catch(err => console.log(err));
  }, [item]);

  const idLog = localStorage.getItem("@buscapet-ID");

  function deletePet() {
    const token = "Token " + localStorage.getItem("@buscapet-Token");
    axios
      .delete("http://kimmikirino.pythonanywhere.com/pet/" + info.id, {
        headers: { Authorization: token }
      })
      .then(function(response){
        props.history.push("/");
      }  
      )
      .catch(error => console.log(error));
  }


  const Loading = () => {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10} sm={4} md={3}>
          <Skeleton width="55%" />
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton width="66%" />
          <Skeleton width="55%" />
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {info ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Card className={classes.card}>
              <div className={classes.backTop}></div>
              <Avatar
                src={info.photo ? info.photo : SemFoto}
                className={classes.avatar}
              />
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="h5">{info.name}</Typography>
                    <Typography>{`Adicionado em ${new Date(
                      info.date
                    ).toLocaleDateString()}`}</Typography>
                    <Typography variant="body2">
                      Tipo de pet: {info.pet_type}
                    </Typography>
                    <Typography variant="body2">Porte: {info.size}</Typography>
                    <Typography variant="body2">Sexo: {info.gender}</Typography>
                    <Typography variant="body2">
                      Adoção: {info.status}
                    </Typography>
                    <Typography variant="body2">Raça: {info.breed}</Typography>
                    <Typography variant="body2">
                      Endereço: {info.location}
                    </Typography>
                    <Typography variant="body2">Contato: {contact}</Typography>
                    <Typography variant="body2">
                      Descrição: {info.description}
                    </Typography>
                    <Fab
                      onClick={e => deletePet()}
                      color="secondary"
                      disabled={idpet == idLog ? false : true}
                      aria-label="delete"
                      className={classes.fab}
                    >
                      <DeleteIcon />
                    </Fab>
                    {idpet == idLog ? (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={{ pathname: "/editar-pet", state: { id: info.id } }}
                      >
                        <Fab
                          color="primary"
                          disabled={false}
                          aria-label="edit"
                          className={classes.fab}
                        >
                          <EditIcon />
                        </Fab>
                      </Link>
                    ) : (
                      <Fab
                        color="primary"
                        disabled={true}
                        aria-label="edit"
                        className={classes.fab}
                      >
                        <EditIcon />
                      </Fab>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Script
                      url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAitS2LXn0ufnylBsQ4rypbGCaLsrIb4g&libraries=places"
                      onLoad={geocodeAddress}
                    />
                    <Map
                      //width={100%}
                      height={300}
                      center={values.center}
                      zoom={values.zoom}
                      animate={values.animate}
                      metaWheelZoom={values.metaWheelZoom}
                      twoFingerDrag={values.twoFingerDrag}
                      zoomSnap={values.zoomSnap}
                      mouseEvents={values.mouseEvents}
                      touchEvents={values.touchEvents}
                      minZoom={values.minZoom}
                      maxZoom={values.maxZoom}
                    >
                      <Marker
                        anchor={values.center}
                        payload={1}
                        onClick={({ event, anchor, payload }) => {}}
                      />
                      <Overlay anchor={values.center} offset={[120, 79]}>
                        <img src="pigeon.jpg" width={240} height={158} alt="" />
                      </Overlay>
                    </Map>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default withRouter(InfoPet);
