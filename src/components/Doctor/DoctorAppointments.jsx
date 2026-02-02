import React, { useEffect, useState } from "react";
import api from "../API/Api";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const doctorId = localStorage.getItem("doctorId");
  const doctorName = localStorage.getItem("doctorName");

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    try {
      const [appRes, userRes, patientRes] = await Promise.all([
        api.get("/appointments"),
        api.get("/users"),
        api.get("/patients")
      ]);

      const mergedData = appRes.data
        .filter(app => app.doctorId === doctorId)
        .map(app => {
          const user = userRes.data.find(
            u => u.name.toLowerCase() === app.patient.toLowerCase()
          );

          const patient = patientRes.data.find(
            p => p.name.toLowerCase() === app.patient.toLowerCase()
          );

          return {
            ...app,
            email: user?.email || "N/A",
            phone: user?.phone || "N/A",
            age: patient?.age || "N/A",
            gender: patient?.gender || "N/A",
            disease: patient?.disease || "N/A"
          };
        });

      setAppointments(mergedData);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  return (
    <>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h5" mb={3}>
        Appointments – {doctorName}
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments found</Typography>
      ) : (
        appointments.map(app => (
          <Card key={app.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><b>Name:</b> {app.patient}</Typography>
                  <Typography><b>Email:</b> {app.email}</Typography>
                  <Typography><b>Phone:</b> {app.phone}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography><b>Age:</b> {app.age}</Typography>
                  <Typography><b>Gender:</b> {app.gender}</Typography>
                  <Typography><b>Disease:</b> {app.disease}</Typography>
                </Grid>
              </Grid>

              <Typography mt={2}>
                <b>Date:</b> {app.date}
              </Typography>
              <Typography>
                <b>Time:</b> {app.time}
              </Typography>
              <Typography>
                <b>Status:</b> {app.status || "Scheduled"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default DoctorAppointments;
