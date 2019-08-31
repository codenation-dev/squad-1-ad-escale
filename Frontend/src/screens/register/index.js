import React from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PasswordInput from "../../components/PasswordInput";
import { styled } from "@material-ui/core/styles";
import api from "../../services/api";
import { login } from "../../services/auth";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    name: "",
    error: ""
  };

  RouterLink = styled(RouterLink)({
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  });

  BotaoLogin = styled(Button)({
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17"
    }
  });

  BotaoCadastar = styled(Button)({
    background: "#7b1fa2",
    color: "#fff",
    "&:hover": {
      background: "#aa00ff"
    }
  });
  TextField = styled(TextField)({
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
    },
    margin: "10px 0"
  });

  handleRegister = async e => {
    e.preventDefault();
    const { username, password, name } = this.state;
    const emailvalid = username.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailvalid === null) {
      this.setState({
        error: "E-mail inválido"
      });
    } else {
      if (!username || !password || !name) {
        this.setState({
          error: "Preencha e-mail, senha e nome para continuar !"
        });
      } else {
        try {
          await api.post("/signup", { username, email: username, password, name });
          const response = await api.post("/login", { username, password });
          login(response.data.token, response.data.id);
          this.setState({
            error: ""
          });
          this.props.handleLogin(e);
          this.props.history.push("/");
        } catch (err) {
          this.setState({
            error: "Houve um problema com o cadastro."
          });
        }
      }
    }
  };

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
                Cadastro
              </Typography>
              <form>
                {this.state.error && <p>{this.state.error}</p>}
                <this.TextField
                  id="email"
                  label="E-mail"
                  name="email"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={this.state.username}
                  onChange={e => {
                    this.setState({ username: e.target.value });
                  }}
                />
                <PasswordInput
                  value={this.state.password}
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                >
                  Senha
                </PasswordInput>
                <this.TextField
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                  id="name"
                  label="Nome"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </form>
            </CardContent>
            <CardContent>
              <div>
                <this.BotaoCadastar
                  type="submit"
                  onClick={this.handleRegister}
                  fullWidth
                >
                  Continuar
                </this.BotaoCadastar>
              </div>
            </CardContent>
            <CardContent>
              <Divider variant="middle" />
            </CardContent>
            <CardContent>
              <this.RouterLink to="/entrar">
                <this.BotaoLogin fullWidth>Login</this.BotaoLogin>
              </this.RouterLink>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    );
  }
}

export default Register;
