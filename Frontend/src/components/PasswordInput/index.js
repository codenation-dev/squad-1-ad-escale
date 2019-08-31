import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


const useStyles = makeStyles(theme => ({
    root: {
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
      }
}));

const PasswordInput = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onChange = props.onChange;
  const value = props.value;

  return (
    <TextField
      id="outlined-adornment-password"
      className={classes.root}
      variant="outlined"
      margin="normal"
      type={values.showPassword ? "text" : "password"}
      label={props.children}
      value={value}
      fullWidth
      required
      name="password"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

export default PasswordInput;
