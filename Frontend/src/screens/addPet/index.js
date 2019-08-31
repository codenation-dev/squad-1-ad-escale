import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "date-fns";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Script from "react-load-script";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120
  },
  date: {
    border: "1px solid #9ccc65",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff"
    }
  },
  input: {
    margin: "0",
    width: "100%",
    "& label.Mui-focused": {
      color: "#4caf50"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#9ccc65"
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#9ccc65"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#9ccc65"
      }
    }
  },
  select: {
    width: "100%",
    "& label.Mui-focused": {
      backgroundColor: "#fff",
      color: "#4caf50"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#9ccc65"
    },
    "& .MuiInputLabel-outlined": {
      backgroundColor: "#fff"
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#9ccc65"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#9ccc65"
      }
    }
  },
  botaoEnviar: {
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17"
    }
  },
  camera: {
    background: "#00c853",
    width: "100%",
    padding: "16px",
    color: "#fff",
    "&:hover": {
      background: "#64dd17"
    }
  }
});

const addPet = props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = React.useState({
    pet_type: "",
    category: "",
    date: "",
    size: "",
    status: "",
    gender: ""
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = React.useState({ name: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [description, setDescription] = React.useState({ description: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [breed, setBreed] = React.useState({ breed: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [photo, setPhoto] = React.useState({ photo: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [address, setAddress] = React.useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [locate, setLocate] = React.useState("");


  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleRegister(e) {
    e.preventDefault();
    const token = "Token " + localStorage.getItem("@buscapet-Token");
    const url = "http://kimmikirino.pythonanywhere.com/pet/";
    const config = {
      headers: { "content-type": "multipart/form-data", Authorization: token }
    };
    const formData = new FormData();
    formData.append("name", name.name);
    formData.append("category", values.category);
    formData.append("status", values.status);
    formData.append("gender", values.gender);
    formData.append("breed", breed.breed);
    formData.append("photo", photo.photo);
    formData.append("size", values.size);
    formData.append("pet_type", values.pet_type);
    formData.append("location", locate.locate);
    formData.append("description", description.description);
    formData.append("date", selectedDate.toISOString());

    axios
      .post(url, formData, config)
      .then(function(response){
        props.history.push("/");
      }  
      )
      .catch(error => console.log(error));
  }


  let autocomplete;

  function handleScriptLoad() {
    // eslint-disable-next-line
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {}
    );
    autocomplete.setFields(["address_components", "formatted_address"]);
    autocomplete.addListener("place_changed", handlePlaceSelect);
  }
  function handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      setAddress({ address: address[0].long_name });
      setLocate({ locate: addressObject.formatted_address });
    }
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        <Card>
          <CardContent>
            <Grid style={{ marginBottom: "1rem" }} item xs>
              <Typography component="h1" variant="h5">
                Cadastrar Pet
              </Typography>
            </Grid>
            <form noValidate autocomple="off">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <TextField
                    type="text"
                    value={name.name}
                    onChange={e => setName({ name: e.target.value })}
                    className={classes.input}
                    id="outlined-name"
                    label="Name do Pet"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <FormControl variant="outlined" className={classes.select}>
                    <InputLabel htmlFor="outlined-age-simple">
                      Tipo de pet
                    </InputLabel>
                    <Select
                      value={values.pet_type}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          name="pet_type"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value={"gato"}>Gato</MenuItem>
                      <MenuItem value={"cachorro"}>Cachorro</MenuItem>
                      <MenuItem value={"pássaro"}>Pássaro</MenuItem>
                      <MenuItem value={"roedor"}>Roedor</MenuItem>
                      <MenuItem value={"cavalo"}>Cavalo</MenuItem>
                      <MenuItem value={"outros"}>Outros</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <FormControl variant="outlined" className={classes.select}>
                    <InputLabel htmlFor="outlined-age-simple">
                      Categoria
                    </InputLabel>
                    <Select
                      value={values.category}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          name="category"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value={"Achado - Estou procurando meu dono"}>
                        Estou procurando meu dono
                      </MenuItem>
                      <MenuItem value={"Achado - Achei meu dono"}>
                        Achei meu dono
                      </MenuItem>
                      <MenuItem value={"Perdido - Estou procurando meu Pet"}>
                        Estou procurando meu Pet
                      </MenuItem>
                      <MenuItem value={"Perdido - Encontrei meu Pet"}>
                        Encontrei meu Pet
                      </MenuItem>
                      <MenuItem value={"Adoção - Estou procurando um Lar"}>
                        Estou procurando um lar
                      </MenuItem>
                      <MenuItem value={"Adoção - Encontrei um Lar"}>
                        Encontrei um lar
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <FormControl variant="outlined" className={classes.select}>
                    <InputLabel htmlFor="outlined-age-simple">
                      Situação
                    </InputLabel>
                    <Select
                      value={values.status}
                      onChange={handleChange}
                      input={
                        <OutlinedInput name="status" id="outlined-age-simple" />
                      }
                    >
                      <MenuItem value={"disponível"}>Disponivel</MenuItem>
                      <MenuItem value={"indisponível"}>Indisponivel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <FormControl variant="outlined" className={classes.select}>
                    <InputLabel htmlFor="outlined-age-simple">Sexo</InputLabel>
                    <Select
                      value={values.gender}
                      onChange={handleChange}
                      input={
                        <OutlinedInput name="gender" id="outlined-age-simple" />
                      }
                    >
                      <MenuItem value={"macho"}>Macho</MenuItem>
                      <MenuItem value={"fêmea"}>Fêmea</MenuItem>
                      <MenuItem value={"não identificado"}>Não identificado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <FormControl variant="outlined" className={classes.select}>
                    <InputLabel htmlFor="outlined-age-simple">Porte</InputLabel>
                    <Select
                      value={values.size}
                      onChange={handleChange}
                      input={
                        <OutlinedInput name="size" id="outlined-age-simple" />
                      }
                    >
                      <MenuItem value={"pequeno"}>Pequeno</MenuItem>
                      <MenuItem value={"médio"}>Médio</MenuItem>
                      <MenuItem value={"grande"}>Grande</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      value={selectedDate}
                      onChange={handleDateChange}
                      id="date-picker-inline"
                      label="Date picker inline"
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <input
                    accept="image/*"
                    name="photo"
                    onChange={e => setPhoto({ photo: e.target.files[0] })}
                    className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      color="primary"
                      variant="raised"
                      component="span"
                      className={classes.camera}
                    >
                      <AddAPhotoIcon />
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                  <TextField
                    type="text"
                    value={breed.breed}
                    onChange={e => setBreed({ breed: e.target.value })}
                    className={classes.input}
                    id="outlined-name"
                    label="Raça"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                  <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAitS2LXn0ufnylBsQ4rypbGCaLsrIb4g&libraries=places"
                    onLoad={handleScriptLoad}
                  />
                  <TextField
                    id="autocomplete"
                    type="text"
                    value={locate.locate}
                    onChange={e => setAddress({ address: e.target.value })}
                    className={classes.input}
                    label="Endereço"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    type="text"
                    value={description.description}
                    onChange={e =>
                      setDescription({ description: e.target.value })
                    }
                    className={classes.input}
                    id="outlined-name"
                    label="Descrição"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    variant="contained"
                    onClick={handleRegister}
                    className={classes.botaoEnviar}
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default withRouter(addPet);
