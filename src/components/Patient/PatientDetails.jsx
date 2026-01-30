import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, Typography, Button, Divider, Table, TableBody, TableRow, TableCell,
  TableHead} from "@mui/material";
import Logout from "../Auth/Logout";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/patients/${id}`).then(res => {
      setPatient(res.data);

      axios.get("http://localhost:8000/appointments")
        .then(a =>
          setAppointments(
            a.data.filter(x => x.patient === res.data.name)
          )
        );

      axios.get("http://localhost:8000/medicalRecords")
        .then(m =>
          setMedicalRecords(
            m.data.filter(x => x.patientName === res.data.name)
          )
        );
    });
  }, [id]);

  if (!patient) return null;

  return (
    <Box maxWidth="900px" mx="auto" my={4}>
      
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Patient Profile</Typography>
        <Box>
          <Button
            size="small"
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Logout />
        </Box>
      </Box>

      {/* BASIC INFO */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <Box p={3}>
          <Typography variant="subtitle1" gutterBottom>
            <b>Personal Information</b>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Table size="small">
            <TableBody>
              {[
                ["Name", patient.name],
                ["Age", patient.age],
                ["Gender", patient.gender],
                ["Phone", patient.phone],
                ["Email", patient.email],
                ["Disease", patient.disease],
              ].map(([label, value]) => (
                <TableRow key={label}>
<TableCell
  sx={{
    width: 180,
    fontWeight: 600,
    color: "text.primary"
  }}
>                    {label}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>

      {/* APPOINTMENTS */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <Box p={3}>
          <Typography variant="subtitle1" gutterBottom>
            <b>Appointments</b>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {appointments.length === 0 ? (
            <Typography color="text.secondary">
              <b>No appointments available</b>
            </Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>Doctor</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>{a.doctor}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell>{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Card>

      {/* MEDICAL RECORDS */}
      <Card variant="outlined">
        <Box p={3}>
          <Typography variant="subtitle1" gutterBottom>
            <b>Medical Records</b>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {medicalRecords.length === 0 ? (
            <Typography color="text.secondary">
              <b>No medical records available</b>
            </Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>Doctor</b></TableCell>
                  <TableCell><b>Disease</b></TableCell>
                  <TableCell><b>Prescription</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalRecords.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.doctorName}</TableCell>
                    <TableCell>{r.disease}</TableCell>
                    <TableCell>{r.prescription}</TableCell>
                    <TableCell>{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default PatientDetails;
