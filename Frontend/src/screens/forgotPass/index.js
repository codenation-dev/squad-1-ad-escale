import React, { useState } from "react";
import {
  CardContent,
  Typography,
  Box,
  Grid,
  Card,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Green from "@material-ui/core/colors/green";
import LightGreen from "@material-ui/core/colors/lightGreen";
import api from "../../services/api";

const useStyles = makeStyles({
  input: {
    "& label.Mui-focused": {
      color: Green
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: LightGreen["A400"]
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: LightGreen["A400"]
      },
      "&.Mui-focused fieldset": {
        borderColor: LightGreen["A400"]
      }
    }
  },
  recuperar: {
    backgroundColor: "#7b1fa2",
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#aa00ff"
    },
    "&.Mui-disabled": {
      backgroundColor: "#c7c7c7"
    }
  }
});

const ForgotPass = () => {
  const classes = useStyles();
  const [status, setStatus] = useState(true);
  const [e_mail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = e => {
    const emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setEmail(e.target.value);
    setStatus(!emailValid);
  };
  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      console.log(e_mail);
      const response = await api.post("/api/password_reset/", {email: e_mail});
      
      setMessage("Verifique a Caixa de Entrada e o Spam de seu e-mail.");
  
    }catch{
      //lidar com o erro
    }
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Grid item xs={10} sm={8} md={5} lg={5} xl={4}>
        <Card m={2}>
          <CardContent>
            <Typography>Esqueceu a Senha ?</Typography>
            <form noValidate>
              <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={e_mail}
                id="email"
                label="Digite seu E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => handleChange(e)}
              />
              {message &&<Typography variant="p" component="p">
                {message}
              </Typography>}
              <div style={{ marginTop: "1rem" }}>
                <Button
                  className={classes.recuperar}
                  style={{ width: "100%" }}
                  disabled={status}
                  onClick={handleSubmit}
                >
                  Recuperar senha
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default ForgotPass;
