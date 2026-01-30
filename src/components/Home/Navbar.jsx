// src/components/Navbar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Hospital Management System
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            <Button component={Link} to="/" sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button component={Link} to="/services" sx={{ color: "#fff" }}>
              Services
            </Button>
            <Button component={Link} to="/contact" sx={{ color: "#fff" }}>
              Contact
            </Button>
            <Button component={Link} to="/help" sx={{ color: "#fff" }}>
              Help
            </Button>

            {!user && (
              <>
                <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                  Login
                </Button>
                <Button component={Link} to="/register" sx={{ color: "#fff" }}>
                  Register
                </Button>
              </>
            )}

            {user && (
              <>
                {user.role === "admin" && (
                  <Button component={Link} to="/adminDashboard" sx={{ color: "#fff" }}>
                    Admin
                  </Button>
                )}
                {user.role === "doctor" && (
                  <Button component={Link} to="/doctorDashboard" sx={{ color: "#fff" }}>
                    Doctor
                  </Button>
                )}
                {user.role === "patient" && (
                  <Button component={Link} to="/patientDashboard" sx={{ color: "#fff" }}>
                    Patient
                  </Button>
                )}
                <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
