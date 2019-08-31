import React from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Link as RouterLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import api from "../../services/api";
import { login } from "../../services/auth";
import { styled } from "@material-ui/core/styles";


class Login extends React.Component {
  state = {
    user: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { user, password } = this.state;
    if (!user || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar !" });
    } else {
      try {
        const username = user.toLocaleLowerCase();
        const response = await api.post("/login", { username, password });
        login(response.data.token, response.data.id);
        this.setState({
          error:
            ""
        })
        this.props.handleLogin(e);
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  BotaoEntrar = styled(Button)({
    background: "#00c853",
    color: "#fff",
    "&:hover": {
      background: "#64dd17"
    }
  });

  BotaoCadastrar = styled(Button)({
    background: "#7b1fa2",
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
    color: "#fff",
    "&:hover": {
      background: "#aa00ff"
    }
  });

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
                Entrar
              </Typography>
              <form onSubmit={this.handleSignIn} noValidate>
                {this.state.error && <p>{this.state.error}</p>}
                <TextInput
                  onChange={e => this.setState({ user: e.target.value })}
                />
                <PasswordInput
                  value={this.state.password}
                  onChange={e => {this.setState({ password: e.target.value });}}
                >
                  Senha
                </PasswordInput>
                <div style={{ marginBottom: "1rem" }}>
                  <RouterLink to="/recuperar-senha">Esqueci a Senha</RouterLink>
                </div>
                <this.BotaoEntrar
                  type="submit"
                  style={{ width: "100%" }}
                  variant="contained"
                >
                  ENTRAR
                </this.BotaoEntrar>
              </form>
            </CardContent>
            <Divider variant="middle" />
            <CardContent>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </CardContent>
            <Divider variant="middle" />
            <CardContent>
              <RouterLink style={{ textDecoration: "none" }} to="/cadastrar">
                <this.BotaoCadastrar style={{ width: "100%" }} >Cadastrar</this.BotaoCadastrar>
              </RouterLink>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    );
  }
}

export default Login;
