import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LogoutIcon from "@mui/icons-material/Logout";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const [Value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ backgroundColor: "#ffffff" }}>
        <Typography
          variant="h5"
          color="navy"
          fontWeight="700"
          textAlign={"center"}
        >
          Own-Blog <CodeOffIcon />
        </Typography>
        {isLoggedIn && (
          <Box display="flex" margin={"auto"} marginRight={"auto"}>
            <Tabs value={Value} onChange={(e, val) => setValue(val)}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" flexWrap="wrap" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 2, borderRadius: 10, fontSize: "0.9rem" }}
                color="warning"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
    
                sx={{ margin: 2, borderRadius: 10, fontSize: "0.9rem" }}
                color="warning"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 2, borderRadius: 10, fontSize: "0.9rem" }}
              color="warning"
            >
              Logout <LogoutIcon />{" "}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
