import React from "react";
import Navbar from "./components/Navbar";
import { Route,withRouter, Switch} from "react-router-dom";
import Login from "../src/screens/login";
import ForgotPass from "../src/screens/forgotPass";
import Register from "../src/screens/register";
import addPet from "../src/screens/addPet";
import editPet from "../src/screens/editPet";
import MainPage from "../src/screens/mainPage";
import RedefinePass from "../src/screens/redefinePass";
import InfoPet from "../src/screens/infoPet";
import AdvancedSearch from "./components/AdvancedSearch";
import UserProfile from "../src/screens/userProfile";

import {isAuthenticated} from "./services/auth";
import {logout} from "./services/auth";

//import Box from '@'

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: "",
    searchString: ""    
  };

  
  handleClickSearch = event => {
    
    /*Chamar lógica de busca*/
  };
  
  handleClickForm = event => {

    this.setState({
      advancedSearch: {
        ...this.state.advancedSearch,
        [event.target.name]: event.target.value
      }
    });
  };

  
  
  handleLogOut= (e)=>{
    e.preventDefault();
    if(logout()){
      this.setState({isLoggedIn: false});  
      this.props.history.push("/");
    }
  }

  handleLogin=()=>{
    this.setState({isLoggedIn: true});  
  }
  handleType = event => {
    this.setState({ searchString: event.target.value });
    this.props.history.push("/"+event.target.value);
  };
  
  componentDidMount(){
    this.setState({isLoggedIn: isAuthenticated()});
    this.setState({searchString: this.props.match.params.searchString});
  }
  
  
  render() {
    
    return (
      <div style={{ position: "relative" }}>
        <header>
          <Navbar
            isLogged={this.state.isLoggedIn}
            searchString={this.state.searchString}
            
            onType={this.handleType}
            onClickSearch={this.handleClickSearch}            
          />
        </header>

        <div
          style={{ position: "absolute", marginTop: 8, top: 64, width: "100%" }}
        >
          
          
        <Switch>  
          <Route path="/petfind" component={InfoPet} />
          <Route exact path="/entrar" render={(params)=><Login {...params} handleLogin={this.handleLogin}/>} />
          <Route exact path="/cadastrar" render={(params)=><Register {...params} handleLogin={this.handleLogin}/>} />
          <Route exact path="/recuperar-senha" component={ForgotPass} />
          <Route exact path="/adicionar-pet" component={addPet} />
          <Route exact path="/editar-pet" component={editPet} />

          <Route
            exact
            path="/redefinir-senha/:hash"
            render={ ({match}) => {
              
              
              
              return <RedefinePass hash={match.params.hash} />;
            }}
          />
          <Route exact path="/perfil" render={()=><UserProfile handleLogOut={this.handleLogOut}/>}/>
          <Route
            exact
            path="/"
            render={() => (
              <MainPage
                searchString={""}
                onType={this.handleType}
                onClickSearch={this.handleClickSearch}
                onClickForm={this.handleClickForm}              
              />
            )}
          />
          <Route
            exact
            path="/:searchString"
            render={() => (
              <MainPage
                searchString={this.state.searchString}
                onType={this.handleType}
                onClickSearch={this.handleClickSearch}
                onClickForm={this.handleClickForm}              
              />
            )}
          />
         </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
