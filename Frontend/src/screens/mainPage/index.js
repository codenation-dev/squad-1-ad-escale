import React from "react";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import PetCard from "../../components/PetCard";
import AddPetButton from "../../components/AddPetButton";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {styled} from "@material-ui/styles";
class MainPage extends React.Component {
  state={
    bottomValue:0,
  }
  TheBottom = styled(BottomNavigation)({
    width:"100%",
    position:"fixed",
    right:"0px",
    bottom: "0px"
  });

  render() {
    return (
      <div>
      <div position="relative">
          
            <SearchBar
              name={"mainPage"}
              searchString={this.props.searchString}
              onType={this.props.onType}
              onClickSearch={this.props.onClickSearch}
              />
            <div position="relative">
            
              <div style={{ margin: "1rem" }}>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <PetCard bottomValue={this.state.bottomValue} searchString={this.props.searchString}/>
                </Grid>
              </div>
            </div>
            <AddPetButton name={"mainPage"}/>
          
      </div>
      <this.TheBottom
            value={this.state.bottomValue}
            onChange={(event, newValue) => {
              this.setState({bottomValue: newValue});
                     
            }}
            showLabels
            fullWidth
          >
            <BottomNavigationAction label="Perdidos"  />
            <BottomNavigationAction label="Achados"  />
            <BottomNavigationAction label="Adoções"  />
          </this.TheBottom>
      </div>
    );
  }
}

export default withRouter(MainPage);
