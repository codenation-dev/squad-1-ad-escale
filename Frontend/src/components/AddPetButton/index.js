import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {styled} from '@material-ui/styles';
import {Link as RouterLink, withRouter} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {isAuthenticated} from '../../services/auth';


 function AddPetButton(props) {
    const AddPetFab = styled(Fab)({

        background: "#00c853",
        color: "#fff",
        "&:hover": {
            background: "#00c853",
            color: "#fff"
          },
        margin: "normal",
        right:"16px",
        bottom: `${56+16}px`, //56 é a altura da BottomNavigation. Ela não muda independente da tela
        position: "fixed"
    });
    const AddPet= styled(Button)({
        background: "#00c853",
        color: "#fff",
        "&:hover": {
            background: "#64dd17",
            color: "#fff",
        },
        fontSize: "13px",
        
        marginRight: "7px"
    });
    let theme = useTheme();
    let biggerThanMD = useMediaQuery(theme.breakpoints.up("md"));
    
    return (
        ((props.match.path === "/:searchString" ||
        props.location.pathname==="/") && ((isAuthenticated() && 
        
        <RouterLink
            style={{ textDecoration: "none" }}
            to={ "/adicionar-pet"}
          >
            {
            (biggerThanMD && props.name==="Navbar")?  
            <AddPet>Adicionar Pet</AddPet>
             :
            ((!biggerThanMD && props.name==="mainPage")? 
            <AddPetFab 
            aria-label="add"
            >
                <AddIcon />
            </AddPetFab>: "" )}
        </RouterLink> )
        ||( !isAuthenticated() && 
        
        <RouterLink
            style={{ textDecoration: "none" }}
            to={ "/entrar"}
          >
            {
            (biggerThanMD && props.name==="Navbar")?  
            <AddPet>Adicionar Pet</AddPet>
             :
            ((!biggerThanMD && props.name==="mainPage")? 
            <AddPetFab 
            aria-label="add"
            >
                <AddIcon />
            </AddPetFab>: "" )}
        </RouterLink>)
        )
    )
    );

}

export default withRouter(AddPetButton);