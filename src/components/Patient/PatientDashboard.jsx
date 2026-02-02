import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, Alert, TextField, Stack } from "@mui/material";
import Navbar from "../Home/Navbar";
import api from "../API/Api";

const PatientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [view, setView] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);

  // Booking form state
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load data once
  useEffect(() => {
    fetchAppointments();
    fetchRecords();
  }, []);

  const fetchAppointments = () => {
    api
      .get("/appointments")
      .then((res) => setAppointments(res.data || []))
      .catch((err) => console.log(err));
  };

  const fetchRecords = () => {
    api
      .get("/medicalRecords")
      .then((res) => setRecords(res.data || []))
      .catch((err) => console.log(err));
  };

  const handleBookAppointment = async () => {
    if (!doctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const newAppointment = {
      patient: user?.name,
      doctor,
      date,
      time,
    };

    try {
      await api.post("/appointments", newAppointment);
      setSuccessMsg("Appointment booked successfully!");
      setDoctor("");
      setDate("");
      setTime("");
      fetchAppointments(); // Refresh appointment list
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.log(err);
      alert("Error booking appointment. Try again.");
    }
  };

  return (
    <>
      <Navbar />

      <Box p={3}>
        {/* PATIENT INFO */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography>
              <b>Name:</b> {user?.name}
            </Typography>
            <Typography>
              <b>Role:</b> Patient
            </Typography>
          </CardContent>
        </Card>

        {/* ACTION BUTTONS */}
        <Box mt={3}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setView("appointments")}
          >
            View / Book Appointments
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => setView("records")}
          >
            View Medical Records
          </Button>
        </Box>

        {/* APPOINTMENTS VIEW */}
        {view === "appointments" && (
          <Box mt={4}>
            <Typography variant="h5">Book a New Appointment</Typography>
            <Stack spacing={2} mt={2} maxWidth={400}>
              <TextField
                label="Doctor Name"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                fullWidth
              />
              <TextField
                label="Select Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Select Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" onClick={handleBookAppointment}>
                Book Appointment
              </Button>
              {successMsg && <Alert severity="success">{successMsg}</Alert>}
            </Stack>

            <Typography variant="h5" mt={4}>
              My Appointments
            </Typography>

            {appointments.length === 0 ? (
              <Alert sx={{ mt: 2 }} severity="info">
                No appointments available
              </Alert>
            ) : (
              appointments
                .filter((a) => a.patient === user?.name)
                .map((a) => (
                  <Card key={a.id} sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography>
                        <b>Doctor:</b> {a.doctor}
                      </Typography>
                      <Typography>
                        <b>Date:</b> {a.date}
                      </Typography>
                      <Typography>
                        <b>Time:</b> {a.time || "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
            )}
          </Box>
        )}

        {/* MEDICAL RECORDS VIEW */}
        {view === "records" && (
          <Box mt={4}>
            <Typography variant="h5">My Medical Records</Typography>

            {records.length === 0 ? (
              <Alert sx={{ mt: 2 }} severity="info">
                No medical records available
              </Alert>
            ) : (
              records
                .filter((r) => r.patient === user?.name)
                .map((r) => (
                  <Card key={r.id} sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography>
                        <b>Doctor:</b> {r.doctor}
                      </Typography>
                      <Typography>
                        <b>Diagnosis:</b> {r.diagnosis}
                      </Typography>
                      <Typography>
                        <b>Medicines:</b> {r.medicines}
                      </Typography>
                      <Typography>
                        <b>Date:</b> {r.date}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default PatientDashboard;
