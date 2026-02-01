import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // remove token, role, user
    navigate("/");        // go to home page safely
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Help", path: "/help" },
  ];

  const userLinks = user ? [
    user.role === "admin" && { name: "Admin", path: "/adminDashboard" },
    user.role === "doctor" && { name: "Doctor", path: "/doctorDashboard" },
    user.role === "patient" && { name: "Patient", path: "/patientDashboard" },
  ].filter(Boolean) : [];

  const authLinks = user
    ? [{ name: "Logout", action: handleLogout }]
    : [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" }
      ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {[...commonLinks, ...userLinks, ...authLinks].map((link, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => link.action ? link.action() : navigate(link.path)}
            >
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* Mobile menu icon */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Hospital Management System
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {[...commonLinks, ...userLinks, ...authLinks].map((link, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => link.action ? link.action() : navigate(link.path)}
              >
                {link.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer for fixed AppBar */}
      <Toolbar />
    </Box>
  );
};

export default Navbar;
