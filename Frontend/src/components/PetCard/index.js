import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import SemFoto from "../../components/img/SemFoto.png";


const useStyles = makeStyles({
  card: {
    height: "300px",
    margin: 0,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxShadow: "1px 1px 9px 0px rgba(0, 0, 0, 0.34)",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)"
    }
  },
  title: {
    height: "40px",
    padding: "0px",
    color: "#fff",
    background: "linear-gradient(to top, rgba(19, 19, 19, 0) 0%, rgba(0, 0, 0, 0.6) 95%);"
  },
  titleLetter: {
    padding: "9px"
  },
  bottom: {
    color: "#fff",
    margin: "11rem 0 0 0",
    height: "61px",
    background: "linear-gradient(to bottom, rgba(19, 19, 19, 0) 0%, rgba(0, 0, 0, 0.6) 80%);",
    padding: "0 0 0 10px"
  }
});

const PetCard = props => {
  const classes = useStyles();

  const [dados, setDados] = useState(false);
  const [filtrado, setFiltrado] = useState([]) 

  useEffect(() => {
    Loading();
  }, []);

  useEffect(() => {
    setFiltrado(false);
    axios
    .get(
      `http://kimmikirino.pythonanywhere.com/petfind/?search=${props.searchString}`
    )
    .then(response => {setDados(response.data); 
    })
    .catch(function(error) {
      console.log(error);
    });
  }, [props.searchString])

  useEffect(() => {
    
    if(dados){
      let key="";
      switch(props.bottomValue){
        case 0:
          key="Perdido";
          break;
        case 1:
          key="Achado";
          break;
        case 2:
          key="Adoção";
          break;
        default:
          break;
      }  
        setFiltrado(dados.filter((ele)=> {
          if(!(ele.category===null)){
            return ele.category.includes(key)}
          return false;
          }));

      }
      else{
        return;
      }
    
    
  }, [props.bottomValue, dados])

  const Loading = () => {
    return (
      <>
        <Grid item xs={12} sm={4} md={3}>
          <Skeleton width="55%" />
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton width="66%" />
          <Skeleton width="55%" />
        </Grid>
        <Grid item xs={false} sm={4} md={3}>
          <Skeleton width="55%" />
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton width="66%" />
          <Skeleton width="55%" />
        </Grid>
        <Grid item xs={false} sm={4} md={3}>
          <Skeleton width="55%" />
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton width="66%" />
          <Skeleton width="55%" />
        </Grid>
        <Grid item xs={false} sm={4} md={3}>
          <Skeleton width="55%" />
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton width="66%" />
          <Skeleton width="55%" />
        </Grid>
      </>
    );
  };

  return (
    <>
      {filtrado ? (filtrado.length===0 ? <h5 style={{width: "100%", textAlign: "center"}}>Nenhum resultado encontrado</h5>
      : (
        filtrado.map((data, i) => (
          <Grow
            in={filtrado}
            style={{ transformOrigin: "0 0 0" }}
            {...(filtrado ? { timeout: 10 + i * 100 } : {})}
          >
            <Grid item xs={12} sm={4} md={3}>
              <Link
                style={{ textDecoration: "none" }}
                to={"/petfind/" + data.id + "/"}
              >
                <Card
                  key={i}
                  style={{
                    backgroundImage: data.photo
                      ? `url(${data.photo})`
                      : `url(${SemFoto})`
                  }}
                  className={classes.card}
                >
                  <CardContent className={classes.title}>
                    <Typography
                      className={classes.titleLetter}
                      component="div"
                      fontWeight="fontWeightLight"
                    >
                      Publicado em {"\n"}
                      {new Date(data.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardContent className={classes.bottom}>
                    <Typography component="div">
                      <Box fontSize="h6.fontSize">{data.name}</Box>
                      <Box>
                        <Box component="span" fontWeight="fontWeightRegular">
                          Raça:{"\n"}
                        </Box>
                        <Box component="span" fontWeight="fontWeightLight">
                          {data.breed}
                        </Box>
                      </Box>
                      <Box>
                        <Box component="span" fontWeight="fontWeightRegular">
                          Sexo:{"\n"}
                        </Box>
                        <Box component="span" fontWeight="fontWeightLight">
                          {data.gender}
                        </Box>
                      </Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grow>
        ))
      )) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default PetCard;
