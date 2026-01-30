import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* IMAGE SECTION */}
      <Box
        sx={{
          height: "75vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ background: "rgba(0,0,0,0.5)", p: 3, borderRadius: 2 }}>
          <Typography variant="h3" color="white">
            Hospital Management System
          </Typography>
          <Typography color="#e0e0e0">
            Manage Patients, Doctors, Appointments & Records
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ padding: 4, backgroundColor: "#f9fafb" }}>
        <Grid container spacing={4} justifyContent="center">

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: 3, boxShadow: 3 }}>
              <PeopleIcon sx={{ fontSize: 48, color: "#2e7d32" }} />
              <CardContent>
                <Typography variant="h6">Patients</Typography>
                <Button variant="contained" sx={{ mt: 2 }}
                  onClick={() => navigate("/admin/patients")}>
                  View Patients
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: 3, boxShadow: 3 }}>
              <LocalHospitalIcon sx={{ fontSize: 48, color: "#1565c0" }} />
              <CardContent>
                <Typography variant="h6">Doctors</Typography>
                <Button variant="contained" sx={{ mt: 2 }}
                  onClick={() => navigate("/admin/doctors")}>
                  View Doctors
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: 3, boxShadow: 3 }}>
              <AssignmentIcon sx={{ fontSize: 48, color: "#ef6c00" }} />
              <CardContent>
                <Typography variant="h6">Medical Records</Typography>
                <Button variant="contained" sx={{ mt: 2 }}
                  onClick={() => navigate("/admin/records")}>
                  View Records
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: 3, boxShadow: 3 }}>
              <EventNoteIcon sx={{ fontSize: 48, color: "#c62828" }} />
              <CardContent>
                <Typography variant="h6">Appointments</Typography>
                <Button variant="contained" sx={{ mt: 2 }}
                  onClick={() => navigate("/admin/appointments")}>
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
