import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
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
});

const TextInput = (props) => {
  const classes = useStyles();
  const onChange = props.onChange
  const value = props.value;
  return (
    <TextField
      className={classes.input}
      onChange={onChange}
      valule={value}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="E-mail"
      name="email"
      autoComplete="email"
      autoFocus
    />
  );
};

export default TextInput;