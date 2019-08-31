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
import PasswordInput from '../../components/PasswordInput';
import { styled } from "@material-ui/core/styles";

import api from "../../services/api";
import {getToken} from "../../services/auth";


class RedefinePass extends React.Component{
    constructor(){
        super();
        //this.classes = useStyles();
    }

    state={
        password:"",
        confirmPass:"",
        error: ""
    }
   
    BotaoRecuperar = styled(Button)({
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
    });

    handleChangePassword = (e) => {
        this.setState({password: e.target.value});
    };
    handleChangeConfirm=(e)=>{
      this.setState({confirmPass: e.target.value});  
      this.setState({isEqual: (this.state.password===this.state.confirmPass)}); 
    }
    onclick=async e=>{
      
      e.preventDefault();
      // console.log(this.props);
      const body = {password: this.state.password, token: this.props.hash};
      // console.log(body);
      try {
        const response = await api.post("/api/password_reset/confirm/", body);
        
        if (response.data) {
          this.setState({
            mensagem: "Senha alterada com sucesso, você pode se logar normalmente",
            password: '',
            confirmPass: ''
          });
        }
      } catch (err) {
        this.setState({
          error: "Houve um problema com a mudança da senha.\n Importante: o link de alteração só pode ser usado uma vez."
        });
      }
      
    
    }

    render() {
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
              <Typography component="h1" variant="h5">
                Redefinição de senha
                </Typography>
              <form noValidate>
                <PasswordInput
                value={this.state.password}
                onChange={this.handleChangePassword}
                >
                    Nova senha
                </PasswordInput>
                <PasswordInput
                disabled={this.state.password.length===0}
                value={this.state.confirmPass}
                onChange={this.handleChangeConfirm}
                >
                    Confirmar nova senha
                </PasswordInput>
                {this.state.error &&
                    <Typography color="error">{this.state.error}</Typography>
                }
                {(!(this.state.password===this.state.confirmPass) && (this.state.confirmPass.length>0))?
                    <Typography color="error">As senhas são diferentes.</Typography>:""
                }
                {
                  this.state.mensagem && (<Typography color="primary">{this.state.mensagem}</Typography>)
                }
                <div style={{ marginTop: "1rem" }}>
                  <this.BotaoRecuperar
                    style={{ width: "100%" }}
                    disabled={(!(this.state.password===this.state.confirmPass)) ||
                    this.state.password.length===0}
                    onClick={this.onclick}
                  >
                    Redefinir senha
                  </this.BotaoRecuperar>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    );
    }
  };
  
  export default RedefinePass;
  