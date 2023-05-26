import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Login = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange=(e)=>{
    e.preventDefault();
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow="2px 2px 10px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h3" textAlign={"center"} fontFamily={"cursive"}>
            {isSignUp ? "SignUp" : "Login"}
          </Typography>
          {isSignUp && (
            <TextField onChange={handleChange} name="name" margin="normal" placeholder="Name" value={inputs.name} />
          )}
          <TextField onChange={handleChange} name="email" margin="normal" placeholder="Email" value={inputs.email} />
          <TextField onChange={handleChange} name="password" margin="normal" placeholder="password" value={inputs.password} />

          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            sx={{
              borderRadius: 3,
              marginTop: 3,
              textDecoration: "2px underline !important",
            }}
            color="warning"
            onClick={() => setisSignUp(!isSignUp)}
          >
            Change to {isSignUp ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
