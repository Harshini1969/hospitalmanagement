// Appointments.jsx
import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const resetForm = () => { setPatient(""); setDoctor(""); setDate(""); setTime(""); };
  const fetchAppointments = () => api.get("/appointments").then(res => setAppointments(res.data));

  useEffect(() => { fetchAppointments(); }, []);

  const fixAppointment = async () => {
    if (!patient || !doctor || !date || !time) { alert("Fill all fields"); return; }
    await api.post("/appointments", { patient, doctor, date, time, status: "scheduled" });
    fetchAppointments(); resetForm();
  };

  const cancelAppointment = async (appointment) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try { await api.delete(`/appointments/${appointment.id}`); fetchAppointments(); } catch(err){ console.error(err); }
  };

  return (
    <Paper sx={{ mt:3, p:3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" size="small" onClick={() => navigate("/")}>Back</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/adminDashboard")}>Admin Page</Button>
      </Box>
      <Typography variant="h6" sx={{ mt:2 }}>Fix Appointment</Typography>
      <Box sx={{ display:"flex", gap:2, my:2, flexWrap:"wrap" }}>
        <TextField label="Patient" value={patient} onChange={e=>setPatient(e.target.value)} />
        <TextField label="Doctor" value={doctor} onChange={e=>setDoctor(e.target.value)} />
        <TextField type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <TextField type="time" value={time} onChange={e=>setTime(e.target.value)} />
        <Button variant="contained" onClick={fixAppointment}>Fix Appointment</Button>
        <Button variant="outlined" color="warning" onClick={resetForm}>Reset</Button>
      </Box>
      <Typography variant="h6">Appointments</Typography>
      {appointments.map(a=>(
        <Paper key={a.id} sx={{p:2, my:1, bgcolor:"#e6ffe6"}}>
          <Typography>Patient: {a.patient}</Typography>
          <Typography>Doctor: {a.doctor}</Typography>
          <Typography>Date: {a.date}</Typography>
          <Typography>Time: {a.time}</Typography>
          <Button variant="contained" color="error" onClick={()=>cancelAppointment(a)} sx={{ mt:1 }}>Cancel Appointment</Button>
        </Paper>
      ))}
    </Paper>
  );
};

export default Appointments;
