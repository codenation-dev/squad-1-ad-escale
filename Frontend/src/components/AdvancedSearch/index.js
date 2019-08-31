import React from "react";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function AdvancedSearch(props) {
  //Especies e raças são chumbadas no código
  const especies = ["Cachorro", "Gato", "Coelho"];
  const racas = {
    Todas: [],
    Cachorro: ["Labrador", "Vira Lata", "Dobberman"],
    Gato: ["Persa", "Fofo"],
    Passaro: [],
    Coelho: []
  };

  let theme = useTheme();
  let biggerThanSM = useMediaQuery(theme.breakpoints.up('sm'));


  return (
    ((props.name==="mainPage"&& !biggerThanSM)||
    (props.name==="navbar" && biggerThanSM)) && 
    
    <Grid 
    
    container style={{ marginTop: 4, position:"absolute", zIndex: 999 }} justify="center">
      
        <Grid item xs={10} sm={8} md={7} lg={6} xl={5} >
        <ClickAwayListener onClickAway={event => props.hideMe()}>
          <Card >
            <CardContent>
              <form
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  zIndex: 1000,
                }}
                autoComplete="off"
              >
                <Grid container m={1}>
                  <Grid item xs={12}>
                    <FormControl

                    fullWidth variant="outlined">
                      <InputLabel
                        style={{ backgroundColor: "white", padding: 4 }}
                        ref={null}
                        htmlFor="especie"
                      >
                        Espécie
                      </InputLabel>
                      <Select
                        value={props.params.type}
                        onChange={event => props.onClick(event)}
                        input={<OutlinedInput name="type" id="especie" />}
                      >
                        <MenuItem 
                        
                        value="Todas">
                          <em>Todas</em>
                        </MenuItem>
                        {especies.map(ele => (
                          <MenuItem value={ele}>{ele}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel
                        htmlFor="status"
                        style={{ backgroundColor: "white", padding: 4 }}
                      >
                        Status
                      </InputLabel>
                      <Select
                        value={props.params.status}
                        onChange={event => props.onClick(event)}
                        input={<OutlinedInput name="status" id="status" />}
                      >
                        <MenuItem value="">
                          <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={1}>Disponível</MenuItem>
                        <MenuItem value={0}>Indisponível</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel
                        htmlFor="breed"
                        style={{ backgroundColor: "white", padding: 4 }}
                      >
                        Raça
                      </InputLabel>
                      <Select
                        value={props.params.breed}
                        onChange={event => props.onClick(event)}
                        input={<OutlinedInput name="breed" id="breed" />}
                      >
                        <MenuItem value="">
                          <em>Todas</em>
                        </MenuItem>
                        {racas[props.params.type].map(ele => (
                          <MenuItem value={ele}>{ele}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel
                        htmlFor="size"
                        style={{ backgroundColor: "white", padding: 4 }}
                      >
                        Porte
                      </InputLabel>
                      <Select
                        value={props.params.size}
                        onChange={event => props.onClick(event)}
                        input={<OutlinedInput name="size" id="size" />}
                      >
                        <MenuItem value="">
                          <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={1}>Pequeno</MenuItem>
                        <MenuItem value={2}>Médio</MenuItem>
                        <MenuItem value={3}>Grande</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel
                        htmlFor="size"
                        style={{ backgroundColor: "white", padding: 4 }}
                      >
                        Sexo
                      </InputLabel>
                      <Select
                        value={props.params.sex}
                        onChange={event => props.onClick(event)}
                        input={<OutlinedInput name="sex" id="sex" />}
                      >
                        <MenuItem value="">
                          <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={1}>Macho</MenuItem>
                        <MenuItem value={2}>Fêmea</MenuItem>
                        <MenuItem value={0}>Indefinido</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                
              </form>
            </CardContent>
          </Card>
          </ClickAwayListener>
        </Grid>
      
    </Grid>
  );
}

export default AdvancedSearch;
