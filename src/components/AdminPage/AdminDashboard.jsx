import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box, Typography, Grid, Card, CardContent, Button, Paper,
  Table, TableHead, TableRow, TableCell, TableBody,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem
} from "@mui/material";
import LogoutButton from "../Auth/Logout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("home");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    axios.get("http://localhost:8000/patients").then(res => setPatients(res.data));
    axios.get("http://localhost:8000/doctors").then(res => setDoctors(res.data));
    axios.get("http://localhost:8000/appointments").then(res => setAppointments(res.data));
  }, []);

  /* ---------------- PATIENT ---------------- */
  const [openPatient, setOpenPatient] = useState(false);
  const [patientForm, setPatientForm] = useState({
    id: null, name: "", age: "", gender: "", disease: "", phone: "", email: ""
  });

  /* ---------------- DOCTOR ---------------- */
  const [openDoctor, setOpenDoctor] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    id: null, name: "", specialization: "", experience: "", email: ""
  });

  /* ---------------- APPOINTMENT ---------------- */
  const [openAppointment, setOpenAppointment] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    id: null, patientId: "", specialization: "", doctorId: "", date: "", time: ""
  });

  const filteredDoctors = doctors.filter(
    d => d.specialization === appointmentForm.specialization
  );

  /* ---------------- SAVE APPOINTMENT ---------------- */
  const saveAppointment = async () => {
    const patient = patients.find(p => p.id === appointmentForm.patientId);
    const doctor = doctors.find(d => d.id === appointmentForm.doctorId);

    const payload = {
      ...appointmentForm,
      patient: patient?.name,
      doctor: doctor?.name
    };

    if (appointmentForm.id) {
      const res = await axios.put(
        `http://localhost:8000/appointments/${appointmentForm.id}`,
        payload
      );
      setAppointments(appointments.map(a => a.id === payload.id ? res.data : a));
    } else {
      const res = await axios.post("http://localhost:8000/appointments", payload);
      setAppointments([...appointments, res.data]);
    }

    setOpenAppointment(false);
    setAppointmentForm({ id: null, patientId: "", specialization: "", doctorId: "", date: "", time: "" });
  };

  return (
    <Box p={3}>

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Box display="flex" gap={1}>
           {/* BACK TO HOME BUTTON */}
          <Box textAlign="right" mt={4}>
            <Button variant="contained" color="primary" onClick={() => navigate("/")}>
              Back
            </Button>
          </Box>
            
          <LogoutButton />
        </Box>
      </Box>

      {/* NAV */}
      <Box mb={3}>
        <Button sx={{ mr: 1 }} variant="contained" onClick={() => setView("home")}>Dashboard</Button>
        <Button sx={{ mr: 1 }} variant="contained" onClick={() => setView("patients")}>Patients</Button>
        <Button sx={{ mr: 1 }} variant="contained" onClick={() => setView("doctors")}>Doctors</Button>
        <Button variant="contained" onClick={() => setView("appointments")}>Appointments</Button>
      </Box>

      {/* DASHBOARD */}
      {view === "home" && (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card><CardContent>
              <Typography>Total Patients</Typography>
              <Typography variant="h4">{patients.length}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={4}>
            <Card><CardContent>
              <Typography>Total Doctors</Typography>
              <Typography variant="h4">{doctors.length}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={4}>
            <Card><CardContent>
              <Typography>Total Appointments</Typography>
              <Typography variant="h4">{appointments.length}</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>
      )}

      {/* PATIENTS */}
      {view === "patients" && (
        <Box sx={{ pt: 3 }}> 
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Your Profile</Typography>
            <Typography><strong>Name:</strong> John Doe</Typography>
            <Typography><strong>Email:</strong> johndoe@gmail.com</Typography>
            <Typography><strong>Phone:</strong> 9876543210</Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setPatientForm({ id: null, name: "", age: "", gender: "", disease: "", phone: "", email: "" });
                setOpenPatient(true);
              }}
              sx={{ mb: 2 }}
            >
              Create Patient
            </Button>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Disease</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.age}</TableCell>
                    <TableCell>{p.gender}</TableCell>
                    <TableCell>{p.disease}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => { setPatientForm(p); setOpenPatient(true); }}>
                        Edit
                      </Button>
                      <Button size="small" color="error" onClick={async () => {
                        await axios.delete(`http://localhost:8000/patients/${p.id}`);
                        setPatients(patients.filter(x => x.id !== p.id));
                      }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}

      {/* DOCTORS */}
      {view === "doctors" && (
        <Paper sx={{ p: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setDoctorForm({ id: null, name: "", specialization: "", experience: "", email: "" });
              setOpenDoctor(true);
            }}
            sx={{ mb: 2 }}
          >
            Create Doctor
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map(d => (
                <TableRow key={d.id}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.specialization}</TableCell>
                  <TableCell>{d.experience} yrs</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => { setDoctorForm(d); setOpenDoctor(true); }}>Edit</Button>
                    <Button size="small" color="error" onClick={async () => {
                      await axios.delete(`http://localhost:8000/doctors/${d.id}`);
                      setDoctors(doctors.filter(x => x.id !== d.id));
                    }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* APPOINTMENTS */}
      {view === "appointments" && (
        <Paper sx={{ p: 2 }}>
          <Button variant="contained" onClick={() => setOpenAppointment(true)} sx={{ mb: 2 }}>
            Create Appointment
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map(a => (
                <TableRow key={a.id}>
                  <TableCell>{a.patient}</TableCell>
                  <TableCell>{a.specialization}</TableCell>
                  <TableCell>{a.doctor}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => { setAppointmentForm(a); setOpenAppointment(true); }}>Edit</Button>
                    <Button size="small" color="error" onClick={async () => {
                      await axios.delete(`http://localhost:8000/appointments/${a.id}`);
                      setAppointments(appointments.filter(x => x.id !== a.id));
                    }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* APPOINTMENT DIALOG */}
      <Dialog open={openAppointment} onClose={() => setOpenAppointment(false)} fullWidth>
        <DialogTitle>Appointment</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField select label="Patient" value={appointmentForm.patientId}
            onChange={e => setAppointmentForm({ ...appointmentForm, patientId: e.target.value })}>
            {patients.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </TextField>

          <TextField select label="Specialization" value={appointmentForm.specialization}
            onChange={e => setAppointmentForm({ ...appointmentForm, specialization: e.target.value, doctorId: "" })}>
            {[...new Set(doctors.map(d => d.specialization))].map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>

          <TextField select label="Doctor" value={appointmentForm.doctorId}
            onChange={e => setAppointmentForm({ ...appointmentForm, doctorId: e.target.value })}>
            {filteredDoctors.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
          </TextField>

          <TextField type="date" value={appointmentForm.date}
            onChange={e => setAppointmentForm({ ...appointmentForm, date: e.target.value })} />
          <TextField type="time" value={appointmentForm.time}
            onChange={e => setAppointmentForm({ ...appointmentForm, time: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAppointment(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveAppointment}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* PATIENT DIALOG */}
      <Dialog open={openPatient} onClose={() => setOpenPatient(false)} fullWidth>
        <DialogTitle>{patientForm.id ? "Edit Patient" : "Create Patient"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={patientForm.name} onChange={e => setPatientForm({ ...patientForm, name: e.target.value })} />
          <TextField label="Age" value={patientForm.age} onChange={e => setPatientForm({ ...patientForm, age: e.target.value })} />
          <TextField select label="Gender" value={patientForm.gender} onChange={e => setPatientForm({ ...patientForm, gender: e.target.value })}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField label="Disease" value={patientForm.disease} onChange={e => setPatientForm({ ...patientForm, disease: e.target.value })} />
          <TextField label="Phone" value={patientForm.phone} onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })} />
          <TextField label="Email" value={patientForm.email} onChange={e => setPatientForm({ ...patientForm, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPatient(false)}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            if (patientForm.id) {
              const res = await axios.put(`http://localhost:8000/patients/${patientForm.id}`, patientForm);
              setPatients(patients.map(p => p.id === patientForm.id ? res.data : p));
            } else {
              const res = await axios.post("http://localhost:8000/patients", patientForm);
              setPatients([...patients, res.data]);
            }
            setOpenPatient(false);
            setPatientForm({ id: null, name: "", age: "", gender: "", disease: "", phone: "", email: "" });
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DOCTOR DIALOG */}
      <Dialog open={openDoctor} onClose={() => setOpenDoctor(false)} fullWidth>
        <DialogTitle>{doctorForm.id ? "Edit Doctor" : "Create Doctor"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={doctorForm.name} onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} />
          <TextField label="Specialization" value={doctorForm.specialization} onChange={e => setDoctorForm({ ...doctorForm, specialization: e.target.value })} />
          <TextField label="Experience (Years)" value={doctorForm.experience} onChange={e => setDoctorForm({ ...doctorForm, experience: e.target.value })} />
          <TextField label="Email" value={doctorForm.email} onChange={e => setDoctorForm({ ...doctorForm, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDoctor(false)}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            if (doctorForm.id) {
              const res = await axios.put(`http://localhost:8000/doctors/${doctorForm.id}`, doctorForm);
              setDoctors(doctors.map(d => d.id === doctorForm.id ? res.data : d));
            } else {
              const res = await axios.post("http://localhost:8000/doctors", doctorForm);
              setDoctors([...doctors, res.data]);
            }
            setOpenDoctor(false);
            setDoctorForm({ id: null, name: "", specialization: "", experience: "", email: "" });
          }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
