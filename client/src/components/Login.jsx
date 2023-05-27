import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setisSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    // e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    //   const res = await axios
    //   .post(`http://localhost:5000/api/user/${type}`, {
    //     name: inputs.name,
    //     email: inputs.email,
    //     password: inputs.password,
    //   })
    //   .catch((err) => console.log(err));

    // const data = await res.data;
    // console.log(data);
    // return data;
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      const data = res.data;
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      // Handle the error gracefully
      // You can return an error message or perform any other necessary actions
      return null;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    if (isSignUp) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
      // .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
      // .then((data) => console.log(data));
    }
  };

  const notify = () => {
    isSignUp
      ? toast("SignUp  succcessfully", { autoClose: 1500 })
      : toast("Logged in sucessfully", { autoClose: 1500 });
  };

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
            <TextField
              onChange={handleChange}
              name="name"
              margin="normal"
              placeholder="Name"
              value={inputs.name}
              required="true"
              type="name"
            />
          )}
          <TextField
            onChange={handleChange}
            name="email"
            margin="normal"
            placeholder="Email"
            value={inputs.email}
            required="true"
            type="email"
          />
          <TextField
            onChange={handleChange}
            name="password"
            margin="normal"
            placeholder="password"
            value={inputs.password}
            required="true"
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={notify}
          >
            Submit
            <ToastContainer />
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
            Change to {isSignUp ? "Login" : "SignUp"}?
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
