import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const contactData = {
  phone: "+91 9876543210",
  email: "support@hospital.com",
  address: "123, Main Street, City, Country",
  workingHours: "Mon - Sat, 9:00 AM - 6:00 PM",
  helpline: "+91 9123456789",
};

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        {/* Header */}
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ fontWeight: "bold", mb: 2 }}>
          Contact Us
        </Typography>

        {/* Back Button */}
        <Box textAlign="right" mb={3}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Back 
          </Button>
        </Box>

        <Typography variant="subtitle1" textAlign="center" mb={4} sx={{ color: "#555" }}>
          We are here to assist you. Reach out to us through any of the following channels.
        </Typography>

        {/* Contact Cards */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#e3f2fd",
                borderRadius: 2,
              }}
            >
              <LocalPhoneIcon sx={{ fontSize: 40, color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Phone</Typography>
                <Typography>{contactData.phone}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#fff3e0",
                borderRadius: 2,
              }}
            >
              <EmailIcon sx={{ fontSize: 40, color: "#fb8c00" }} />
              <Box>
                <Typography variant="h6">Email</Typography>
                <Typography>{contactData.email}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#fce4ec",
                borderRadius: 2,
              }}
            >
              <LocationOnIcon sx={{ fontSize: 40, color: "#d81b60" }} />
              <Box>
                <Typography variant="h6">Address</Typography>
                <Typography>{contactData.address}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#e8f5e9",
                borderRadius: 2,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 40, color: "#43a047" }} />
              <Box>
                <Typography variant="h6">Working Hours</Typography>
                <Typography>{contactData.workingHours}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#ede7f6",
                borderRadius: 2,
              }}
            >
              <SupportAgentIcon sx={{ fontSize: 40, color: "#5e35b1" }} />
              <Box>
                <Typography variant="h6">Helpline</Typography>
                <Typography>{contactData.helpline}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
