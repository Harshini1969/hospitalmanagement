import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DoctorAppointments from "./DoctorAppointments";
import DoctorPrescriptions from "./DoctorPrescriptions";
import AddPrescription from "../AdminPage/AddPrescription";

const DoctorsDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [view, setView] = useState("appointments");

  if (!user) {
    return <Typography>Please login again</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4">Doctor Dashboard</Typography>

      <Typography mt={2}><b>Name:</b> {user.name}</Typography>
      <Typography><b>Specialization:</b> {user.specialization}</Typography>

      <Button sx={{ mt: 3 }} variant="contained"
        onClick={() => setView("appointments")}>
        View Appointments
      </Button>
      <Button
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
          onClick={() => setView("prescription")}
        >
          Add Prescription
        </Button>

       <Button
         variant="contained"
         color="info"
        onClick={() => setView("viewPrescriptions")}
      >
          View Prescriptions
          </Button>
      {view === "appointments" && <DoctorAppointments />}
      {view === "prescription" && <AddPrescription onBack={() => setView("")}/>}
      {view === "viewPrescriptions" && <DoctorPrescriptions />}
    </Box>
  );
};

export default DoctorsDashboard;
